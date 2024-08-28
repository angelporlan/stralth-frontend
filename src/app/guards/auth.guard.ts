import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return true; // Usuario autenticado, permite la navegación
    } else {
      this.router.navigate(['/login']); // Redirige al login si no hay usuario
      return false; // Bloquea la navegación
    }
  }
}
