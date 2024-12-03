import { CurrencyPipe } from '@angular/common';
import { Menu, Permission, PermissionNode } from '../models/usuario.model';

export class Currency {
  private static currencyPipe = new CurrencyPipe('en-US'); // Configura el locale según tu región

  static format(value: number | undefined, currencyCode: string = 'USD'): string {
    if (value == undefined) {
      return '0.00';
    }
    return this.currencyPipe.transform(value, currencyCode, 'symbol', '1.2-2') || '';
  }
}

export class Email {
  static isValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}

export class MenuPermisssion {

  static format(permisos: Permission[]): PermissionNode[] {
    // Crear un mapa de todos los permisos por su ID
    const permisoMap: { [key: number]: PermissionNode } = {};


    permisos.forEach(permiso => {
      permisoMap[permiso.menu.id] = { ...permiso, children: [] };
    });

    // Crear la estructura jerárquica
    const raiz: PermissionNode[] = [];

    permisos.forEach(permiso => {
      const nodo = permisoMap[permiso.menu.id];
      if (permiso.menu.padre === 0) {
        // Si no tiene padre, es raíz
        raiz.push(nodo);
      } else {
        // Si tiene padre, lo añadimos a sus hijos
        const padre = permisoMap[permiso.menu.padre];
        if (padre) {
          padre.children.push(nodo);
        }
      }
    });
    return this.ordenarNodos(raiz);
  }

  // Ordenar nodos recursivamente por 'orden'
  static ordenarNodos(nodos: PermissionNode[]): PermissionNode[] {
    return nodos
      .sort((a, b) => a.menu.orden - b.menu.orden)
      .map(nodo => ({
        ...nodo,
        children: this.ordenarNodos(nodo.children)
      }));
  }

}



