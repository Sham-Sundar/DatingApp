import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  protected accountService = inject(AccountService);
  protected creds: any = {};

  ngOnInit(){
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user = localStorage.getItem('User');
    if (user) {
      this.accountService.currentUser.set(JSON.parse(user));
    }
  }

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => this.creds = {},
      error: error => alert(error.message)
    })
  }

  logout() {
    this.accountService.logout();
  }


}
