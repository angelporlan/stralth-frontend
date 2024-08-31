import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { RoutinesService } from '../../../services/routines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routine-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routine-box.component.html',
  styleUrl: './routine-box.component.css'
})
export class RoutineBoxComponent {
  @Input() routine!: { _id:string; name: string; exercises: string[] };

  @Output() deleteRoutine = new EventEmitter<string>();

  constructor(
    private routinesService: RoutinesService,
    private authService: AuthService,
    private router: Router
  ) {}

  // removeRoutine() {
  //   this.routinesService
  //     .deleteRoutine(this.authService.getToken(), this.routine._id)
  //     .subscribe(
  //       (data: any) => {
  //         console.log('Routine deleted:', data);
  //         window.location.reload();
  //       },
  //       (error: any) => {
  //         console.error('Error deleting routine:', error);
  //       }
  //     );
  // }

  // openDialog(): void {
  //   const dialog: HTMLDialogElement | null = document.querySelector('#dialog');
  //   if (dialog) {
  //     dialog.showModal();
  //   }
  // }


  clickInDelete() {
    this.deleteRoutine.emit(this.routine._id);
  }


  startRoutine(routineId: string) {
    this.router.navigate(['/start-routine', routineId]);
  }

  statsRoutine(routineId: string) {
    this.router.navigate(['/routine-stats', routineId]);
  }
}
