import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/general/navbar/navbar.component";
import { RoutinesService } from '../../services/routines.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SetBoxComponent } from '../../components/start-routine/set-box/set-box.component';
import { FormsModule } from '@angular/forms';
import { CompletedRoutinesService } from '../../services/completed-routines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-routine',
  standalone: true,
  imports: [NavbarComponent, CommonModule, SetBoxComponent, FormsModule],
  templateUrl: './start-routine.component.html',
  styleUrl: './start-routine.component.css'
})

export class StartRoutineComponent {
  routine: any = null;

  constructor(
    private route: ActivatedRoute,
    private routinesService: RoutinesService,
    private authService: AuthService,
    private completedRoutinesService: CompletedRoutinesService,
    private router: Router
  ) {}

  ngOnInit() {
    const routineId = this.route.snapshot.paramMap.get('id'); 
    if (routineId) {
      const routine = this.routinesService.getRoutineByIdFromLocalStorage(routineId);
  
      if (routine) {
        this.routine = {
          ...routine,
          exercises: routine.exercises.map((exercise: string) => ({
            name: exercise,
            sets: [
              { weight: null, reps: null }, 
              { weight: null, reps: null }, 
              { weight: null, reps: null }  
            ]
          }))
        };
        console.log('Routine loaded from localStorage:', this.routine);
      } else {
        console.error('Routine not found in localStorage');
      }
    } else {
      console.error('No routine ID provided in the route.');
    }
  }
  

  addSet(exercise: any) {
    exercise.sets.push({ weight: null, reps: null });
  }

  deleteSet(exercise: any, setIndex: number) {
    exercise.sets.splice(setIndex, 1);
  }

  saveRoutine() {
    console.log('Rutina guardada:', this.routine);
    const completedRoutine = {
      routine: this.routine,
      exercises: this.routine.exercises.map((exercise: any) => ({
        name: exercise.name,
        sets: exercise.sets.map((set: any) => ({
          weight: set.weight,
          reps: set.reps
        }))
      }))
    };
    this.completedRoutinesService.addCompletedRoutineToLocalStorage(completedRoutine);
    this.router.navigate(['/home']);
    this.completedRoutinesService.postCompletedRoutine(this.authService.getToken(), this.routine._id, completedRoutine).subscribe(
      (data: any) => {
        console.log('Rutina completada guardadaaa:', data);
      },
      (error: any) => {
        console.error('Error saving completed routine:', error);
      }
    );
  }

  cancelRoutine() {
    this.router.navigate(['/create-routine']);
  }

}


