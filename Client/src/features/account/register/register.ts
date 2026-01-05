import { Component, inject, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { RegisterCreds } from '../../../types/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit{
  protected accountService = inject(AccountService);
  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();
  protected registerForm: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = new FormGroup({
      email: new FormControl('johndoe@test.com', [Validators.required, Validators.email]),
      displayName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  register() {
    console.log(this.registerForm.value);
    
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
