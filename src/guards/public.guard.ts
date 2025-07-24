// public.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageProvider } from '../providers/local-storage.provider';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(private storeProv: LocalStorageProvider, private router: Router) {}

  canActivate(): boolean {
    // Verificar si hay un token en el almacenamiento local
    const token = this.storeProv.jwtSession;

    // Si no hay token, permitir el acceso a rutas públicas
    if (!token) {
      return true;
    }

    // Si hay un token, verificar si la URL actual es /login y si venimos de una redirección por token expirado
    const currentUrl = window.location.pathname;
    if (currentUrl === '/login') {
      // Permitir el acceso a login incluso con token (podría ser un token expirado)
      return true;
    }

    // Para otras rutas públicas, redirigir a home si hay un token
    this.router.navigate(['/home']);
    return false;
  }
}
