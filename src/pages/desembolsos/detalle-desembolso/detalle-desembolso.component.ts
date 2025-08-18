import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SynergyProvider } from '../../../providers/synergy.provider';
import { DetalleDesembolso, DetalleDesembolsoResponse } from '../../../models/Desembolsos.model.';
import { Currency } from '../../../utility/global.util';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { LocalStorageProvider } from '../../../providers/local-storage.provider';
import { SidebarProvider } from '../../../providers/sidebar.provider';
import { HasActionPermission } from '../../../directivas/has-action-permission.directive';

@Component({
  selector: 'app-detalle-desembolso',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogModule, FormsModule, TagModule, HasActionPermission],
  providers: [SynergyProvider],
  templateUrl: './detalle-desembolso.component.html',
  styleUrls: ['./detalle-desembolso.component.scss']
})
export class DetalleDesembolsoComponent implements OnInit {

  currentDesembolso!: DetalleDesembolso;
  loading = false;

  proveedor: string = '';
  fecha: string = '';

  // Datos del desembolso
  disbursementDetails: any = [];

  constructor(
    private sidebarProvider: SidebarProvider,
    private router: Router,
    private route: ActivatedRoute,
    private synergyProvider: SynergyProvider,
    private messageService: MessageService,
    private storageProvider: LocalStorageProvider,
    private location: Location
  ) { }

  async ngOnInit() {
    try {
      this.sidebarProvider.setToggle(false);
      const desembolsoId = this.route.snapshot.paramMap.get('id');

      if (desembolsoId) {
        const { data } = await this.synergyProvider.getDetailDisbursement(desembolsoId);
        console.log(data);
        if (data) {
          this.currentDesembolso = data.desembolso;
          this.setDetail();
        }
      }
    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    }
  }

  async setDetail() {
    const desembolso = this.currentDesembolso;

    // Agregar detalles del desembolso
    this.disbursementDetails.push({ concept: 'ID del Desembolso', valor: desembolso.id });
    this.disbursementDetails.push({ concept: 'Número de Transacción', valor: desembolso.no_transaccion });
    this.disbursementDetails.push({ concept: 'Método de Pago', valor: desembolso.metodo_pago });
    this.disbursementDetails.push({ concept: 'Monto Final', valor: Currency.format(desembolso.monto_final) });
    this.disbursementDetails.push({ concept: 'Fecha de Desembolso', valor: this.formatDate(desembolso.fecha_desembolso) });
    this.disbursementDetails.push({ concept: 'Estado', valor: this.getEstadoText(desembolso.estado) });

    // Agregar detalles del proveedor
    this.disbursementDetails.push({ concept: 'ID del Proveedor', valor: desembolso.proveedor.id });
    this.disbursementDetails.push({ concept: 'Razón Social', valor: desembolso.proveedor.razon_social });
    this.disbursementDetails.push({ concept: 'Correo Electrónico', valor: desembolso.proveedor.correo_electronico });
    this.disbursementDetails.push({ concept: 'Teléfono', valor: desembolso.proveedor.telefono });

    this.proveedor = desembolso.proveedor.razon_social;
    this.fecha = new Date().toLocaleDateString('en-GB');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getEstadoText(estado: number): string {
    const estados = {
      1: 'Pendiente',
      2: 'En Proceso',
      3: 'Completado',
      4: 'Rechazado',
      5: 'Cancelado',
      6: 'Aprobado',
      7: 'Pagado'
    };
    return estados[estado as keyof typeof estados] || 'Desconocido';
  }

  // Función para redirigir a /desembolsos
  regresarALaLista() {
    this.location.back();
  }
}
