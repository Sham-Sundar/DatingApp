import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  readonly title = signal('Client');
  apiUrl: string = 'https://localhost:5001/api/members/';
  protected members = signal<any>([]);

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe({
      next: response => this.members.set(response),
      error: error => console.error(error),
      complete: () => console.log("Request Completed")
    })
  }
}
