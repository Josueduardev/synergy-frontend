import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarProvider } from '../../../providers/sidebar.provider';
import { SynergyProvider } from '../../../providers/synergy.provider';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-desembolsar-button',
  standalone: true,
  templateUrl: './desembolsar-button.component.html',
  styleUrls: ['./desembolsar-button.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class DesembolsarButtonComponent implements OnInit {
  mostrarModal: boolean = false;
  numeroIngresado: number | null = null;
  id_solicitudes: string[] = [];

    constructor(
      private sidebarProvider: SidebarProvider,
      private synergyProvider: SynergyProvider,
      private messageService: MessageService,
      private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {}

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.numeroIngresado = null;
  }

  procesar(): void {
    this.processSolicitudes();
    this.cerrarModal();
  }

  async processSolicitudes(numeroIngresado: number = this.numeroIngresado ?? 0, id_solicitudes: string[] = this.id_solicitudes) {
    this.id_solicitudes = JSON.parse(localStorage.getItem('solicitudesSeleccionadas') || '[]');
    try {
      const response = await this.synergyProvider.processRequests(id_solicitudes, numeroIngresado, );
      if (response && response.data && Array.isArray(response.data.solicitudes)) {
        this.id_solicitudes = response.data.solicitudes;
      } else {
        this.id_solicitudes = [];  
      }
    } catch (error:any) {
      this.messageService.add({ severity: 'error', summary: 'Error al obtener la solicitud', detail: error.message });
      console.error('Error al obtener solicitudes', error);
    } finally {
      localStorage.removeItem('solicitudesSeleccionadas');
    }
  }
}
