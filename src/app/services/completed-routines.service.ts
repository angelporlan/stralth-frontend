import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompletedRoutinesService {

  private apiUrl = 'https://stralth-backend.onrender.com/api/completed-routines'; //server
  // private apiUrl = 'http://localhost:5005/api/completed-routines'; //local

  constructor(private http: HttpClient) { }

  getCompletedRoutines(token: string): any {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(this.apiUrl, { headers });
  }

  postCompletedRoutine(token: string, routineId: string, completedRoutineData: object): any {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/${routineId}/complete`, completedRoutineData, { headers });
  }

  getCompletedRoutinesFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem('currentCompletedRoutinesStralth') || '{}');
  }

  getCompletedRoutineByRoutineIdFromLocalStorage(routineId: string): any {
    const currentCompletedRoutines = this.getCompletedRoutinesFromLocalStorage();
    return currentCompletedRoutines.find((completedRoutine: any) => completedRoutine.routineId === routineId);
  }

  addCompletedRoutineToLocalStorage(completedRoutine: object): void {
    const currentCompletedRoutines = this.getCompletedRoutinesFromLocalStorage();
    currentCompletedRoutines.push(completedRoutine);
    localStorage.setItem('currentCompletedRoutinesStralth', JSON.stringify(currentCompletedRoutines));
  }
}
