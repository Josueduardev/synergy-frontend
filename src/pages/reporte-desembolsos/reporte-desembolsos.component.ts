import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SynergyProvider } from '../../providers/synergy.provider';
import { SidebarProvider } from '../../providers/sidebar.provider';
import { HasActionPermission } from '../../directivas/has-action-permission.directive';

@Component({
  selector: 'app-reporte-desembolsos',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, CheckboxModule, ToastModule, HasActionPermission],
  providers: [SynergyProvider, MessageService],
  templateUrl: './reporte-desembolsos.component.html',
  styleUrls: ['./reporte-desembolsos.component.scss']
})
export class ReporteDesembolsosComponent implements OnInit {

  loading = false;
  selectedInvoices: number[] = [];
  selectAll: boolean = false;
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
      const resp = await this.synergyProvider.getRequestDesem(1, 100, {});
      const lista = (resp?.data?.desembolsos || []).filter((d: any) => {
        // Mostrar solo desembolsos con estado=7 (pagada). El backend usa 7 en los reportes.
        const est = d?.estado;
        return est === 7 || est === '7' || String(est).toLowerCase() === 'pagada';
      });
      this.facturas = lista.map((d: any) => {
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

      // Crear y descargar el archivo
      this.descargarArchivo(response, 'reporte_cuentas_por_pagar.xlsx');

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

      const response = await this.synergyProvider.generarReporteCuentasPorPagarSeleccionadas(this.selectedInvoices);

      console.log(response)
      // Crear y descargar el archivo
      this.descargarArchivo(response, 'reporte_cuentas_por_pagar_seleccionadas.xlsx');

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

  // Seleccionar/deseleccionar todas las facturas
  toggleSelectAll(event: any) {
    const checked = !!event?.checked;
    this.selectedInvoices = checked ? this.facturas.map(f => f.id) : [];
  }

  // Verificar si todas las facturas están seleccionadas
  isAllSelected(): boolean {
    return this.selectedInvoices.length === this.facturas.length;
  }

  // Verificar si algunas facturas están seleccionadas
  isPartialSelected(): boolean {
    return this.selectedInvoices.length > 0 && this.selectedInvoices.length < this.facturas.length;
  }



  // Manejar cambio de checkbox individual
  onCheckboxChange(event: any, facturaId: number): void {
    const checked = !!event?.checked;
    if (checked) {
      if (!this.selectedInvoices.includes(facturaId)) {
        this.selectedInvoices.push(facturaId);
      }
    } else {
      this.selectedInvoices = this.selectedInvoices.filter(id => id !== facturaId);
    }
    // Sincronizar estado del checkbox de cabecera
    this.selectAll = this.selectedInvoices.length > 0 && this.selectedInvoices.length === this.facturas.length;
  }
}
