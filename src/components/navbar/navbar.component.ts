import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SynergyProvider } from '../../providers/synergy.provider';
import { LocalStorageProvider } from '../../providers/local-storage.provider';


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

  isDropdownOpen = false;

  constructor(
    private synergyProvider: SynergyProvider,
    private storageProvider: LocalStorageProvider,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get userInitial(): string {
    return this.username.charAt(0).toUpperCase();
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateTo(route: string) {
    console.log(`Navigate to ${route}`);
    this.router.navigate([route]);
  }

  logout() {
    const id_usuario = this.storageProvider.userIDSession;
    if (id_usuario) {
      this.synergyProvider.logout(Number.parseInt(id_usuario)).then(
        (response) => {
          this.storageProvider.clearSession();
          this.messageService.add({
            severity: 'success',
            summary: 'Cierre de sesión',
            detail: 'Has cerrado sesión exitosamente',
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Cierre de sesión',
            detail: 'Hubo un problema al cerrar la sesión',
          });
        }
      );
    }
  }
}
