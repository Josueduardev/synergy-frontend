import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageProvider } from '../providers/local-storage.provider';
import { PermissionNode } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardApp implements CanActivate {
    constructor(private storeProv: LocalStorageProvider, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      // 1. Verificar autenticación
      const token = this.storeProv.jwtSession;
      if (!token) {
          // Si no hay token, redirigir a login
          this.router.navigate(['/login']);
          return false;
      }

      // 2. Verificar permisos
      const userPermissions = this.storeProv.menuSession || [];

      // Si no hay permisos en la sesión pero hay token, podría ser un token expirado
      // o una sesión corrupta, así que limpiamos la sesión y redirigimos a login
      if (userPermissions.length === 0) {
          console.log('No hay permisos en la sesión, posible token expirado');
          this.storeProv.clearSession();
          this.router.navigate(['/login']);
          return false;
      }

      const requestedRoute = state.url;

      const hasPermission = this.hasPermission(userPermissions, requestedRoute);

      if (!hasPermission) {
          console.log('❌ AuthGuard - Acceso denegado, redirigiendo a no-autorizado');
          this.router.navigate(['/no-autorizado']);
          return false;
      }
      return true;
    }

    private hasPermission(nodes: PermissionNode[], route: string): boolean {
        // Expresión regular para detectar rutas con un ID al final (por ejemplo, /editar/1)
        const routeWithoutId = route.replace(/\/\d+$/, '');

        // Primero intentar encontrar la ruta exacta
        if (this.findExactRoute(nodes, routeWithoutId)) {
            return true;
        }

        // Si no se encuentra la ruta exacta, buscar en rutas padre
        const parentRoute = this.getParentRoute(routeWithoutId);
        if (parentRoute && this.findExactRoute(nodes, parentRoute)) {
            return true;
        }

        return false; // No tiene permisos para la ruta
    }

    private findExactRoute(nodes: PermissionNode[], route: string): boolean {
        for (const node of nodes) {
            // Verificar si el nodo actual tiene la ruta exacta
            if (node.menu.path === route) {
                return true;
            }

            // Verificar si los hijos del nodo tienen la ruta exacta
            if (node.children && this.findExactRoute(node.children, route)) {
                return true;
            }
        }
        return false;
    }

    private getParentRoute(route: string): string | null {
        // Obtener la ruta padre (por ejemplo, /desembolso/detalle-desembolso -> /desembolso)
        const parts = route.split('/').filter(part => part.length > 0);
        if (parts.length > 1) {
            return '/' + parts[0];
        }
        return null;
    }
}


