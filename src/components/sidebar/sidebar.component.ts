import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { PermissionNode } from '../../models/usuario.model';
import { LocalStorageProvider } from '../../providers/local-storage.provider';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agregar RouterModule aquí
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  permisos: any[] | null = [];
  
  @Input() visible: boolean = true; // Recibe el estado del Sidebar desde el componente principal
  
  constructor(private storageProv: LocalStorageProvider){
    this.permisos = this.storageProv.menuSession;
  }

  toggleMenu(item: any) {
    if (item.children?.length) {
      item.isOpen = !item.isOpen;
    }
  }
}
