import { Component, inject, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { TextInput } from "../../../shared/text-input/text-input";
import { Router } from '@angular/router';
import { MemberService } from '../../../core/services/member-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected accountService = inject(AccountService);
  protected memberService = inject(MemberService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  cancelRegister = output<boolean>();
  protected credentialsForm: FormGroup;
  protected profileForm: FormGroup;
  protected currentStep = signal(1);
  protected validationErrors = signal<string[]>([]);

  constructor(){
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.matchPassword('password', 'confirmPassword') });

    this.profileForm = this.fb.group({
      gender: ['male', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    })
  }

  matchPassword(matchKeyA: string, matchKeyB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(matchKeyA)?.value;
      const confirmPassword = control.get(matchKeyB)?.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    }
  }

  nextStep(){
    if (this.credentialsForm.valid) {
      this.currentStep.update(step => step + 1);
    }
  }

  prevStep(){
    this.currentStep.update(step => step - 1);
  }

  getMaxDate(){
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }

  register() {
    if (this.credentialsForm.valid && this.profileForm.valid) {
      const formData = {...this.credentialsForm.value, ...this.profileForm.value}
      
      this.accountService.register(formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        },
        error: error => {
          console.log(error);
          this.validationErrors.set(error);
        }
      })
    }

  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
