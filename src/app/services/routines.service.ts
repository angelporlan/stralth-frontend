import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {
  
  private apiUrl = 'https://stralth-backend.onrender.com/api/routines'; //server
  // private apiUrl = 'http://localhost:5005/api/routines'; //local

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

  getRoutinesFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem('currentRoutinesStralth') || '{}');
  }

  getRoutineByIdFromLocalStorage(routineId: string): any {
    const currentRoutines = this.getRoutinesFromLocalStorage();
    return currentRoutines.find((routine: any) => routine._id === routineId);
  }

  addRoutineToLocalStorage(routine: object): void {
    const currentRoutines = this.getRoutinesFromLocalStorage();
    currentRoutines.push(routine);
    localStorage.setItem('currentRoutinesStralth', JSON.stringify(currentRoutines));
  }

  deleteRoutineFromLocalStorage(routineId: string): void {
    const currentRoutines = this.getRoutinesFromLocalStorage();
    const newRoutines = currentRoutines.filter((routine: any) => routine._id !== routineId);
    localStorage.setItem('currentRoutinesStralth', JSON.stringify(newRoutines));
  }
}
