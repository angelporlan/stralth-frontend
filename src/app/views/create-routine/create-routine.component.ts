import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/general/navbar/navbar.component';
import { RoutinesService } from '../../services/routines.service';
import { CommonModule } from '@angular/common';
import { RoutineBoxComponent } from '../../components/create-routine/routine-box/routine-box.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-routine',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RoutineBoxComponent, RouterLink],
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css']
})
export class CreateRoutineComponent implements OnInit {
  routines: any;
  isLoading = true;

  constructor(private RoutinesService: RoutinesService, 
    private AuthService: AuthService
   ) { }

  ngOnInit(): void {
    this.getRoutines();
  }

  getRoutines(): void {
    this.RoutinesService.getRoutines(this.AuthService.getToken()).subscribe(
      (data: any[]) => {
        this.routines = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching routines', error);
        this.isLoading = false;
      }
    );
  }
}