import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {
  
  private apiUrl = 'http://localhost:5000/api/routines';

  constructor(private http: HttpClient) { }

  getRoutines(token: string): any {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(this.apiUrl, { headers });
  }

  postRoutine(token: string, routineData: object): any {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(this.apiUrl, routineData, { headers });
  }

  deleteRoutine(token: string, routineId: string): any {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/${routineId}`, { headers });
  }

  getRoutineById(token: string, routineId: string): any {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/${routineId}`, { headers });
  }
}
