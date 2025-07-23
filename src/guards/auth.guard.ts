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
          this.router.navigate(['/login']);
          return false;
      }

      // 2. Verificar permisos
      const userPermissions = this.storeProv.menuSession || [];
      const requestedRoute = state.url;
      const hasPermission = this.hasPermission(userPermissions, requestedRoute);

      if (!hasPermission) {
          this.router.navigate(['/no-autorizado']);
          return false;
      }
      return true;
    }

    private hasPermission(nodes: PermissionNode[], route: string): boolean {
        // Expresión regular para detectar rutas con un ID al final (por ejemplo, /editar/1)
        const routeWithoutId = route.replace(/\/\d+$/, '');
        console.log(routeWithoutId)
    
        for (const node of nodes) {
            // Verificar si el nodo actual tiene la ruta sin ID
            if (node.menu.path === routeWithoutId) {
                return true;
            }
    
            // Verificar si los hijos del nodo tienen la ruta sin ID
            if (node.children && this.hasPermission(node.children, routeWithoutId)) {
                return true;
            }
        }
        return false; // No tiene permisos para la ruta
    }
    
    }


