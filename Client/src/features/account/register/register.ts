import { Component, inject, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { RegisterCreds } from '../../../types/user';
import { JsonPipe } from '@angular/common';
import { TextInput } from "../../../shared/text-input/text-input";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();
  protected credentialsForm: FormGroup;
  protected profileForm: FormGroup;
  protected currentStep = signal(1);

  constructor(){
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.matchPassword('password', 'confirmPassword') });

    this.profileForm = this.fb.group({
      gender: ['', Validators.required],
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

  register() {
    if (this.credentialsForm.valid && this.profileForm.valid) {
      const formData = {...this.credentialsForm.value, ...this.profileForm.value}
      console.log('Form Data:', formData);
      
    }

    // this.accountService.register(this.creds).subscribe({
    //   next: result => {
    //     console.log(result);
    //     if (result) {
    //       localStorage.setItem('isRegistered', 'True');
    //       this.cancelRegister.emit(false);
    //     }
    //   },
    // })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
