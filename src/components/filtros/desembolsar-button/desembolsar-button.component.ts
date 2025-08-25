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

  /**
   * Determina la extensión correcta del archivo basado en el tipo MIME del blob
   */
  private getFileExtension(blob: Blob): string {
    if (blob.type.includes('excel') || blob.type.includes('spreadsheet') || blob.type.includes('xlsx')) {
      return '.xlsx';
    } else if (blob.type.includes('pdf')) {
      return '.pdf';
    } else if (blob.type.includes('word') || blob.type.includes('docx')) {
      return '.docx';
    } else {
      // Por defecto, basado en el nombre del archivo del backend
      return '.xlsx';
    }
  }

  /**
   * Genera un PDF individual para una solicitud específica
   * NOTA: Este método genera PDFs individuales, diferente al método processSolicitudes
   * que genera un archivo Excel con múltiples desembolsos
   */
  async generateIndividualPDF(idSolicitud: string): Promise<void> {
    try {
      this.loading = true;
      const response = await this.synergyProvider.generateRequestPDF(idSolicitud);

      if (response instanceof Blob && response.size > 0) {
        const blobUrl = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `Solicitud_${idSolicitud}_${new Date().toISOString().split('T')[0]}.pdf`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);

        this.messageService.add({
          severity: 'success',
          summary: 'PDF Generado',
          detail: 'PDF de la solicitud generado exitosamente.'
        });
      }
    } catch (error: any) {
      console.error('Error generating individual PDF:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al generar el PDF de la solicitud.'
      });
    } finally {
      this.loading = false;
    }
  }

  procesar(): void {
    this.processSolicitudes();
  }

  async processSolicitudes(numeroIngresado: number = this.numeroIngresado ?? 0, id_solicitudes: string[] = this.id_solicitudes) {
    this.loading = true;
    this.id_solicitudes = JSON.parse(localStorage.getItem('solicitudesSeleccionadas') || '[]');

    // Validar que haya solicitudes seleccionadas
    if (this.id_solicitudes.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No hay solicitudes seleccionadas para procesar.'
      });
      this.loading = false;
      return;
    }

    try {
      const response = await this.synergyProvider.processRequests(this.id_solicitudes, numeroIngresado);
      console.log('Response from processRequests:', response);

      // Generar y descargar el archivo Excel
      if (response instanceof Blob) {
        // Verificar que el blob no esté vacío
        if (response.size === 0) {
          throw new Error('El archivo generado está vacío');
        }

        // Crear URL del blob
        const blobUrl = window.URL.createObjectURL(response);

        // Crear elemento de descarga - El backend devuelve Excel, no PDF
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `Desembolsos_${new Date().toISOString().split('T')[0]}.xlsx`;

        // Simular clic para descargar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Liberar memoria
        window.URL.revokeObjectURL(blobUrl);

        this.messageService.add({
          severity: 'success',
          summary: 'Desembolsar',
          detail: `Se desembolsarán ${this.id_solicitudes.length} solicitudes seleccionadas. Archivo Excel generado exitosamente.`
        });

        this.loading = false;
        this.cerrarModal();

        setTimeout(() => {
          this.router.navigate(['/desembolso/sin-procesar']);
        }, 2000);
      } else {
        // Fallback por si la respuesta no es un blob
        console.log('Response is not a blob:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Desembolsar',
          detail: `Se desembolsarán ${this.id_solicitudes.length} solicitudes seleccionadas.`
        });
        this.loading = false;
        this.cerrarModal();
        setTimeout(() => {
          this.router.navigate(['/desembolso/sin-procesar']);
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error in processSolicitudes:', error);

      // Manejar diferentes tipos de errores
      let errorMessage = 'Error al procesar las solicitudes';
      if (error.message) {
        errorMessage = error.message;
      } else if (error.detail) {
        errorMessage = error.detail;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Error al procesar solicitudes',
        detail: errorMessage
      });

      this.loading = false;
      this.cerrarModal();
    } finally {
      localStorage.removeItem('solicitudesSeleccionadas');
    }
  }
}
