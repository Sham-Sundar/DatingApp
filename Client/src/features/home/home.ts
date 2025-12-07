import { Component, signal } from '@angular/core';
import { Register } from "../register/register";

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected _register = signal(false);
  protected isRegistered = localStorage.getItem('isRegistered');
  protected isLoggedIn = localStorage.getItem('User');
  

  register(value: boolean){
    if (this.isRegistered && this.isLoggedIn) return;
    this._register.set(value);
  }
}
