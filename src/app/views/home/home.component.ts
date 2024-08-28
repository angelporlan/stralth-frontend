import { Component, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../../components/general/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { RoutinesService } from '../../services/routines.service';
import { CompletedRoutinesService } from '../../services/completed-routines.service';
import { Router } from '@angular/router';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  currentUser: any;
  routineCounter: number = 0;
  completedRoutine: any;
  completedRoutineCounter: number = 0;
  chart: any;

  constructor(
    private authService: AuthService,
    private routinesService: RoutinesService,
    private completedRoutinesService: CompletedRoutinesService,
    private router: Router
  ) { 
    Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);
  }

  ngOnInit() {
    this.currentUser = this.authService.getUserFromLocalStorage();
    this.routinesService.getRoutines(this.authService.getToken()).subscribe(
      (data: any) => {
        this.routineCounter = data.length;
      },
      (error: any) => {
        console.error('Error getting routines:', error);
      }
    );
    this.completedRoutinesService.getCompletedRoutines(this.authService.getToken()).subscribe(
      (data: any) => {
        this.completedRoutineCounter = data.length;
        this.completedRoutine = data;
        this.createChart(); 
      },
      (error: any) => {
        console.error('Error getting completed routines:', error);
      }
    );
  }

  ngAfterViewInit() {}

  createChart() {
    const last7Days = this.getLast7Days();
    const routineDataByDay: { [key: string]: { [key: string]: number } } = {};
  
    last7Days.forEach(day => {
      routineDataByDay[day] = {};
    });
  
    this.completedRoutine.forEach((routine: any) => {
      const routineDate = new Date(routine.date);
      const dayOfWeek = this.getDayOfWeek(routineDate);
  
      if (routineDataByDay[dayOfWeek]) {
        const routineName = routine.routine?.name || 'Sin nombre';
        if (routineDataByDay[dayOfWeek][routineName]) {
          routineDataByDay[dayOfWeek][routineName]++;
        } else {
          routineDataByDay[dayOfWeek][routineName] = 1;
        }
      }
    });
  
    const routineCounts = last7Days.map(day => {
      return Object.values(routineDataByDay[day]).reduce((a, b) => a + b, 0);
    });
  
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: last7Days, 
          datasets: [{
            label: 'Entrenamientos Completados',
            data: routineCounts, 
            backgroundColor: '#4CAF50', 
            borderColor: '#4CAF50',
            borderWidth: 0, 
            borderRadius: 8, 
            hoverBackgroundColor: '#388E3C',
            hoverBorderColor: '#388E3C',
            barThickness: 18 
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false 
            },
            tooltip: {
              displayColors: false, 
              callbacks: {
                label: (context: any) => {
                  const day = context.label;
                  const exercises = routineDataByDay[day];
                  const exerciseDetails = Object.entries(exercises).map(([name, count]) => `${name}: ${count}`).join(', ');
                  return `${exerciseDetails}`;
                }
              },
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              titleColor: '#fff', 
              bodyColor: '#fff', 
              borderColor: '#388E3C', 
              borderWidth: 1
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1, 
                color: '#fff',
                font: {
                  size: 14, 
                  weight: 'bold'
                }
              },
              grid: {
                color: 'rgba(200, 200, 200, 0.2)' 
              }
            },
            x: {
              ticks: {
                color: '#fff', 
                font: {
                  size: 12,
                  weight: 'bold' 
                }
              },
              grid: {
                display: false 
              }
            }
          }
        }
      });
    }
  }
  
  
  

  getLast7Days(): string[] {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      days.push(this.getDayOfWeek(day));
    }
    return days;
  }

  getDayOfWeek(date: Date): string {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    return days[date.getDay()];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
