import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SynergyProvider } from '../../providers/synergy.provider';
import { SidebarProvider } from '../../providers/sidebar.provider';
import { HasActionPermission } from '../../directivas/has-action-permission.directive';
import { getCurrentDateFormatted } from '../../utility/global.util';

@Component({
  selector: 'app-reporte-desembolsos',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, ToastModule, HasActionPermission],
  providers: [SynergyProvider, MessageService],
  templateUrl: './reporte-desembolsos.component.html',
  styleUrls: ['./reporte-desembolsos.component.scss']
})
export class ReporteDesembolsosComponent implements OnInit {

  loading = false;
  selectedInvoices: any[] = [];
  // Datos reales desde API (desembolsos con factura relacionada)
  facturas: Array<{
    id: number; // id de desembolso (para selección y reporte seleccionado)
    proveedor_id: string | number | null;
    proveedor_razon_social: string;
    no_factura: string;
    fecha_emision: string | Date;
    fecha_vence: string | Date;
    monto: number;
    estado: string;
  }> = [];

  constructor(
    private sidebarProvider: SidebarProvider,
    private synergyProvider: SynergyProvider,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.sidebarProvider.setToggle(false);
    this.cargarDesembolsos();
  }

  // Cargar desembolsos reales desde API y mapear a filas de tabla
  async cargarDesembolsos() {
    try {
      this.loading = true;
      const resp = await this.synergyProvider.getRequestDesemPagadas(1, 100);
      this.facturas = resp?.data?.desembolsos.map((d: any) => {
        const solicitud = d?.solicitud || {};
        const factura = solicitud?.factura || {};
        const proveedor = factura?.proveedor || {};
        return {
          id: d.id,
          proveedor_id: proveedor.id ?? null,
          proveedor_razon_social: proveedor.razon_social || '',
          no_factura: factura.no_factura || '',
          fecha_emision: factura.fecha_emision || '',
          fecha_vence: factura.fecha_vence || '',
          monto: Number(factura.monto ?? 0),
          estado: String(d.estado ?? '')
        };
      });
    } catch (error) {
      console.error('Error al cargar desembolsos:', error);
    } finally {
      this.loading = false;
    }
  }

  // Generar reporte de todas las facturas
  async generarReporteCompleto() {
    try {
      this.loading = true;
      this.messageService.add({
        severity: 'info',
        summary: 'Generando Reporte',
        detail: 'Preparando reporte de cuentas por pagar...'
      });

      const response = await this.synergyProvider.generarReporteCuentasPorPagar();

      const safeDate = getCurrentDateFormatted();
      // Crear y descargar el archivo
      this.descargarArchivo(response, `reporte_facturas_${safeDate}.xlsx`);

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Reporte generado y descargado correctamente'
      });
    } catch (error: any) {
      console.error('Error al generar reporte:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message || 'Error al generar el reporte'
      });
    } finally {
      this.loading = false;
    }
  }

  // Generar reporte de facturas seleccionadas
  async generarReporteSeleccionado() {
    if (this.selectedInvoices.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe seleccionar al menos una factura'
      });
      return;
    }

    try {
      this.loading = true;
      this.messageService.add({
        severity: 'info',
        summary: 'Generando Reporte',
        detail: `Preparando reporte para ${this.selectedInvoices.length} factura(s) seleccionada(s)...`
      });

      // Extraer los IDs de las facturas seleccionadas
      const facturaIds = this.selectedInvoices.map(factura => factura.id);

      const response = await this.synergyProvider.generarReporteCuentasPorPagarSeleccionadas(facturaIds);

      const safeDate = getCurrentDateFormatted();
      this.descargarArchivo(response, `reporte_facturas_seleccionadas_${safeDate}.xlsx`);

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Reporte de facturas seleccionadas generado correctamente'
      });

      // Limpiar selección
      this.selectedInvoices = [];
    } catch (error: any) {
      console.error('Error al generar reporte:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message || 'Error al generar el reporte'
      });
    } finally {
      this.loading = false;
    }
  }

  // Función para descargar archivo
  private descargarArchivo(data: any, filename: string) {
    try {
      // Crear blob y descargar (si ya es Blob úsalo directamente)
      const blob = data instanceof Blob ? data : new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();

      // Limpiar
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar archivo:', error);
      throw new Error('Error al procesar la descarga del archivo');
    }
  }
}
