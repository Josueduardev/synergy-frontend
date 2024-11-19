import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, BreadcrumbModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() username: string = 'Justina Clark'; // Nombre del usuario
  @Input() role: string = 'Admin'; // Rol del usuario
  @Input() breadcrumbs: MenuItem[] = [
    { label: 'Solicitudes' },
    { label: 'Aprobadas' },
    { label: 'Inicio' },
  ]; // Ejemplo de elementos del breadcrumb
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>(); // Evento para alternar el Sidebar

  isDropdownOpen = false; // Estado del menú desplegable

  // Devuelve la inicial del nombre del usuario para el avatar
  get userInitial(): string {
    return this.username.charAt(0).toUpperCase();
  }

  // Alterna la visibilidad del Sidebar
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  // Alterna la visibilidad del menú desplegable
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Navegación a otra sección
  navigateTo(route: string) {
    console.log(`Navigate to ${route}`);
    // Aquí iría la lógica de navegación, si se desea implementarla
  }

  // Lógica para cerrar sesión
  logout() {
    console.log('Logout');
    // Aquí iría la lógica de cierre de sesión
  }
}
