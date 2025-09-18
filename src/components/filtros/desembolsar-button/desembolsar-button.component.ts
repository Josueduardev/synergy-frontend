import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarProvider } from '../../../providers/sidebar.provider';
import { SynergyProvider } from '../../../providers/synergy.provider';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-desembolsar-button',
  standalone: true,
  templateUrl: './desembolsar-button.component.html',
  styleUrls: ['./desembolsar-button.component.scss'],
  imports: [CommonModule, FormsModule, CalendarModule]
})
export class DesembolsarButtonComponent implements OnInit {
  mostrarModal: boolean = false;
  numeroIngresado: number | null = null;
  id_solicitudes: string[] = [];
  fecha_iso: string = "";
  loading: boolean = false;
  // Fecha seleccionada desde el datepicker
  fechaSeleccionada: Date | null = null;
  minDate: Date = new Date();

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
    this.fechaSeleccionada = null;
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

  async processSolicitudes(numeroIngresado: string = this.numeroIngresado?.toString() ?? "1", id_solicitudes: string[] = this.id_solicitudes, _fecha_iso?: string) {
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
      // Formatear la fecha seleccionada al formato requerido por el backend (YYYYMMDD)
      const fecha_iso = this.formatFechaYYYYMMDD(this.fechaSeleccionada);
      const response = await this.synergyProvider.processRequestsWithFilename(this.id_solicitudes, numeroIngresado, fecha_iso);
      console.log('Response from processRequestsWithFilename:', response);

      // Verificar que el blob no esté vacío
      if (response.blob.size === 0) {
        throw new Error('El archivo generado está vacío');
      }

      // Crear URL del blob
      const blobUrl = window.URL.createObjectURL(response.blob);

      // Crear elemento de descarga usando el nombre del archivo del backend
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = response.filename; // Usar el nombre del archivo del backend

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

  /**
   * Convierte un objeto Date a string con formato YYYYMMDD. Si no hay fecha, retorna cadena vacía.
   */
  private formatFechaYYYYMMDD(date: Date | null): string {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
}
