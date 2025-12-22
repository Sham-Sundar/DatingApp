import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected router = inject(Router);
  readonly title = signal('Dating App');
  apiUrl: string = 'https://localhost:5001/api/members/';
  protected members = signal<any>([]);

  ngOnInit() {
    this.http.get(this.apiUrl).subscribe({
      next: response => this.members.set(response),
      error: error => console.error(error),
      complete: () => console.log("Request Completed")
    })
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

}
