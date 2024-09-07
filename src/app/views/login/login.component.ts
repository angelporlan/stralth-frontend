import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { RoutinesService } from '../../services/routines.service';
import { CompletedRoutinesService } from '../../services/completed-routines.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private RoutinesService: RoutinesService,
    private CompletedRoutinesService: CompletedRoutinesService
  ) { }

  loginUser() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('currentUserStralth', JSON.stringify(response));
  
        forkJoin({
          routines: this.RoutinesService.getRoutines(this.authService.getToken()),
          completedRoutines: this.CompletedRoutinesService.getCompletedRoutines(this.authService.getToken())
        }).subscribe({
          next: ({ routines, completedRoutines }) => {
            localStorage.setItem('currentRoutinesStralth', JSON.stringify(routines));
            localStorage.setItem('currentCompletedRoutinesStralth', JSON.stringify(completedRoutines));
  
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error getting routines or completed routines:', error);
          }
        });
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

} 
