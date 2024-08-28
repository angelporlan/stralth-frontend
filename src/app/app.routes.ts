import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
// import { LandingComponent } from './views/landing/landing.component';
import { LoginComponent } from './views/login/login.component';
import { CreateRoutineComponent } from './views/create-routine/create-routine.component';
import { NewRoutineComponent } from './views/new-routine/new-routine.component';
import { StartRoutineComponent } from './views/start-routine/start-routine.component';
import { StatsRoutineComponent } from './views/stats-routine/stats-routine.component';
import { RegisterComponent } from './views/register/register.component';

import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, 
    { path: 'login', component: LoginComponent },
    { path: 'create-routine', component: CreateRoutineComponent, canActivate: [AuthGuard] }, 
    { path: 'new-routine', component: NewRoutineComponent, canActivate: [AuthGuard] }, 
    { path: 'start-routine/:id', component: StartRoutineComponent, canActivate: [AuthGuard] },
    { path: 'routine-stats/:id', component: StatsRoutineComponent, canActivate: [AuthGuard] }, 
    { path: 'register', component: RegisterComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] }, 
];
