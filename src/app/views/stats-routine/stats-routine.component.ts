import { Component, QueryList, ViewChildren, AfterViewInit, ElementRef } from '@angular/core';
import { NavbarComponent } from "../../components/general/navbar/navbar.component";
import { AuthService } from "../../services/auth.service";
import { CompletedRoutinesService } from "../../services/completed-routines.service";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stats-routine',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './stats-routine.component.html',
  styleUrls: ['./stats-routine.component.css']
})
export class StatsRoutineComponent implements AfterViewInit {
  @ViewChildren('exerciseChart') exerciseCharts!: QueryList<any>;

  completedRoutine: any[] = [];
  exercisesRoutine: any;
  exerciseChartsData: any[] = [];
  routineName: string = '';
  isLoading = true;

  constructor(
    private authService: AuthService,
    private completedRoutinesService: CompletedRoutinesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const routineId = this.route.snapshot.paramMap.get('id');
    this.completedRoutinesService.getCompletedRoutines(this.authService.getToken()).subscribe(
      (data: any) => {
        this.completedRoutine = data.filter((routine: any) => routine.routine._id === routineId);

        if (this.completedRoutine.length > 0) {
          this.routineName = this.completedRoutine[0].routine.name;

          this.exercisesRoutine = this.completedRoutine[0].exercises.map((exercise: any) => exercise.name);

          this.exerciseChartsData = this.exercisesRoutine.map((exerciseName: string) => {
            return {
              exerciseName: exerciseName,
              chartData: this.generateExerciseData(exerciseName)
            };
          });

          this.isLoading = false;
        }
      },
      (error: any) => {
        console.error('Error getting completed routines:', error);
        this.isLoading = false;

      }
    );
  }

  ngAfterViewInit() {
    this.exerciseCharts.changes.subscribe(() => {
      this.renderCharts();
    });
  }

  generateExerciseData(exerciseName: string) {
    const labels: string[] = [];
    const weightData: number[] = [];
    const repsData: number[] = [];

    this.completedRoutine.forEach((routine: any, routineIndex: number) => {
      const exercise = routine.exercises.find((ex: any) => ex.name === exerciseName);

      if (exercise) {
        exercise.sets.forEach((set: any, setIndex: number) => {
          labels.push(`${routineIndex + 1} - ${setIndex + 1}`);
          weightData.push(set.weight);
          repsData.push(set.reps);
        });
      }
    });

    const dataSets = [
      {
        label: 'Weight (kg)',
        data: weightData,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Reps',
        data: repsData,
        borderColor: 'rgba(153,102,255,1)',
        tension: 0.1,
        fill: false,
      }
    ];

    return {
      labels: labels,
      datasets: dataSets
    };
  }

  renderCharts() {
    this.exerciseCharts.toArray().forEach((canvas: ElementRef, index: number) => {
      new Chart(canvas.nativeElement, {
        type: 'line',
        data: this.exerciseChartsData[index].chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    });
  }
}
