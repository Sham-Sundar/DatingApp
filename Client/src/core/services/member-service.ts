import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../../types/member';

@Injectable({
  providedIn: 'root',
})

export class MemberService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;
  protected members = signal<any>([]);

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'members');
  }

  getMember(id: string) {
    return this.http.get<Member>(this.baseUrl + 'members/' + id);
  }
}
