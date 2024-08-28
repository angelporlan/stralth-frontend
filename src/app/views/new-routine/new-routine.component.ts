import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/general/navbar/navbar.component";
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RoutinesService } from '../../services/routines.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-routine',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './new-routine.component.html',
  styleUrl: './new-routine.component.css'
})
export class NewRoutineComponent {
  routineName: string = ''; 
  exercises: string[] = ['']; 

  constructor(private routinesService: RoutinesService, private authService: AuthService, private router: Router) {}

  addExercise() {
    this.exercises.push(''); 
  }

  removeExercise(index: number) {
    this.exercises.splice(index, 1); 
  }

  updateExercise(value: string, index: number) {
    this.exercises[index] = value;
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }

  saveRoutine() {
    this.exercises = this.exercises.filter(exercise => exercise.trim() !== '');

    const routineData = {
      name: this.routineName,
      exercises: this.exercises
    };

    console.log(routineData); 
    this.routinesService.postRoutine(this.authService.getToken(), routineData).subscribe(
      (data: any) => {
        console.log('Routine saved:', data);
        this.router.navigate(['/create-routine']);
      },
      (error: any) => {
        console.error('Error saving routine', error);
        if (this.exercises.length === 0) {
          this.exercises.push('');
        }
      }
    );
  }

  cancelRoutine() {
    this.router.navigate(['/create-routine']);
  }
}
