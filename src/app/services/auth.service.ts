import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://stralth-backend.onrender.com/api/users'; //server
  // private apiUrl = 'http://localhost:5005/api/users'; //local

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(body);
    return this.http.post(`${this.apiUrl}/login`, body, { headers });
  }

  getUserFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem('currentUserStralth') || '{}');
  }

  logout(): void {
    localStorage.removeItem('currentUserStralth');
    localStorage.removeItem('currentRoutinesStralth');
    localStorage.removeItem('currentCompletedRoutinesStralth');
  }

  getToken(): string {
    return this.getUserFromLocalStorage().token;
  }

}
