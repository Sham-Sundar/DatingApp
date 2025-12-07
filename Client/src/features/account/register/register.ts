import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { RegisterCreds } from '../../../types/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected accountService = inject(AccountService);
  protected creds = {} as RegisterCreds;
  protected cancelRegister = output<boolean>();


  register() {
    this.accountService.register(this.creds).subscribe({
      next: result => {
        console.log(result);
        if (result) {
          localStorage.setItem('isRegistered', 'True');
          this.cancelRegister.emit(false);
        }
      },
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
