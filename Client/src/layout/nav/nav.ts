import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  protected creds: any = {};
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  
  ngOnInit(){
    this.setCurrentUser();
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  toggleTheme() {
    // Toggle between light and dark
    const newTheme = this.selectedTheme() === 'light' ? 'dark' : 'light';
    this.selectedTheme.set(newTheme);

    // Apply to DOM
    document.documentElement.setAttribute('data-theme', newTheme);

    // Persist in localStorage
    localStorage.setItem('theme', newTheme);
  }
  
  setCurrentUser(){
    const user = localStorage.getItem('User');
    if (user) {
      this.accountService.currentUser.set(JSON.parse(user));
    }
  }

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        this.router.navigateByUrl('/members');
        this.toastService.success("Login Successful");
        this.creds = {};
      },
      error: error => {
        this.toastService.error(error.error);
      }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.toastService.info("Logged Out");
  }


}
