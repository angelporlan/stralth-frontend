import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../components/general/navbar/navbar.component';
import { RoutinesService } from '../../services/routines.service';
import { CommonModule } from '@angular/common';
import { RoutineBoxComponent } from '../../components/create-routine/routine-box/routine-box.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DialogBoxComponent } from '../../components/general/dialog-box/dialog-box.component';

@Component({
  selector: 'app-create-routine',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RoutineBoxComponent, RouterLink, DialogBoxComponent],
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css']
})
export class CreateRoutineComponent implements OnInit {
  routines: any;
  isLoading = true;
  localRoutineId: string = '';

  dialogOpen = false;
  dialogTitle = 'Delete Routine?';
  dialogText = 'If you delete this routine, all the data associated with it will be lost. Are you sure you want to delete it?';


  constructor(private RoutinesService: RoutinesService, 
    private AuthService: AuthService
   ) { }

  ngOnInit(): void {
    this.routines = this.RoutinesService.getRoutinesFromLocalStorage();
    this.isLoading = false;
  }


  onDeleteRoutine(routineId: string): void {
    this.dialogOpen = true;
    this.localRoutineId = routineId;
  }

  closeDialog(): void { 
    this.dialogOpen = false;
   }
  confirmDialog(): void { 
    this.RoutinesService.deleteRoutineFromLocalStorage(this.localRoutineId);
    this.routines = this.RoutinesService.getRoutinesFromLocalStorage();

    this.RoutinesService.deleteRoutine(this.AuthService.getToken(), this.localRoutineId).subscribe(
      (data: any) => {
        console.log('Routine deleted:', data);
      },
      (error: any) => {
        console.error('Error deleting routine:', error);
      }
    );
    this.dialogOpen = false;

   }
}