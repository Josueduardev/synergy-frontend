import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarProvider } from '../../../providers/sidebar.provider';
import { SynergyProvider } from '../../../providers/synergy.provider';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

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
  loading: boolean = false;

    constructor(
      private sidebarProvider: SidebarProvider,
      private synergyProvider: SynergyProvider,
      private messageService: MessageService,
      private route: ActivatedRoute,
      private router: Router,
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
  }

  async processSolicitudes(numeroIngresado: number = this.numeroIngresado ?? 0, id_solicitudes: string[] = this.id_solicitudes) {
    this.loading = true;
    this.id_solicitudes = JSON.parse(localStorage.getItem('solicitudesSeleccionadas') || '[]');
    try {
      const response = await this.synergyProvider.processRequests(id_solicitudes, numeroIngresado, );
      console.log('Response from processRequests:', response);

      // Si llegamos aquí, significa que la respuesta fue exitosa (HttpProvider ya manejó los errores)
      // La respuesta es directamente el body del response
      if (response) {
        this.messageService.add({ severity: 'success', summary: 'Desembolsar', detail: "Se desembolsarán las solicitudes seleccionadas." });
        this.loading = false;
        this.cerrarModal();
        setTimeout(() => {
          this.router.navigate(['/desembolso/sin-procesar']);
        }, 2000);
      } else {
        // Fallback por si la respuesta está vacía pero fue exitosa
        console.log('Empty response but successful');
        this.messageService.add({ severity: 'success', summary: 'Desembolsar', detail: "Se desembolsarán las solicitudes seleccionadas." });
        this.loading = false;
        this.cerrarModal();
        setTimeout(() => {
          this.router.navigate(['/desembolso/sin-procesar']);
        }, 2000);
      }
    } catch (error:any) {
      console.error('Error in processSolicitudes:', error);
      this.messageService.add({ severity: 'error', summary: 'Error al procesar solicitudes', detail: error.message });
      console.error('Error al obtener solicitudes', error);
      this.loading = false;
      this.cerrarModal();
    } finally {
      localStorage.removeItem('solicitudesSeleccionadas');
    }
  }
}
