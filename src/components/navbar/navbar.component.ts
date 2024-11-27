import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SynergyProvider } from '../../providers/synergy.provider';
import { LocalStorageProvider } from '../../providers/local-storage.provider';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, BreadcrumbModule],
  providers: [SynergyProvider, LocalStorageProvider],
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

  constructor(
    private synergyProvider: SynergyProvider,
    private storageProvider: LocalStorageProvider,
    private messageService: MessageService,
    private router: Router
  ){

  }

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
    const id_usuario = this.storageProvider.userIDSession;
    if(id_usuario){
      this.synergyProvider.logout(Number.parseInt(id_usuario)).then(
        (response)=>{
          this.storageProvider.clearSession();
          this.messageService.add({ severity: 'success', summary: 'Cierre de sesión', detail: 'Has cerrado sesión exitosamente' });
          this.router.navigate(['/login']);
        },
        (error)=>{
          this.messageService.add({ severity: 'error', summary: 'Cierre de sesión', detail: 'Hubo un problema al cerrar la sesión' });
        }
      )
    }
  }
}
