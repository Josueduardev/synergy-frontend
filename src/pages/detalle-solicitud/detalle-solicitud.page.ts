import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { SharedComponent } from '../../components/shared/shared.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SynergyProvider } from '../../providers/synergy.provider';
import { Solicitud } from '../../models/solicitud.model';
import { Currency } from '../../utility/global.util';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LocalStorageProvider } from '../../providers/local-storage.provider';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogModule, FormsModule],
  providers: [SynergyProvider],
  templateUrl: './detalle-solicitud.page.html',
  styleUrls: ['./detalle-solicitud.page.scss']
})
export class DetalleSolicitudPage implements OnInit {
  // Ejemplo de solicitud
  solicitud = {
    cliente: 'CLOBI TECHNOLOGIES S.A DE CV',
    aprobador: 'VANESSA CHICAS',
    fecha: '20/12/2023'
  };

  currentSolicitud!: Solicitud;
  loading = false;
  accion = "";

  // Datos de la cesión de facturaje
  invoiceDetails: any = [];

  // Variables para manejar el modal de comentarios y acción
  comentario: string = '';
  modalComentarioVisible: boolean = false;
  modalAccionVisible: boolean = false;

  constructor(
    private sharedComponent: SharedComponent,
    private router: Router,
    private route: ActivatedRoute,
    private synergyProvider: SynergyProvider,
    private messageService: MessageService,
    private storageProvider: LocalStorageProvider
  ) {}

  async ngOnInit() {
    try {
      this.sharedComponent.sidebarVisible = false;
      const noSolicitud = this.route.snapshot.paramMap.get('id');

      if(noSolicitud){
        const {data} = await this.synergyProvider.getDetailRequest(noSolicitud);
        console.log(data);
        if(data){
          this.currentSolicitud = data.solicitud;
          this.setDetail();
        }
      }
    } catch (error:any) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    }


  }

  async setDetail(){

    const solicitud = this.currentSolicitud;
    console.log(solicitud)
    this.invoiceDetails.push({ concept: 'Factura N.º', valor: solicitud.factura.no_factura });
    this.invoiceDetails.push({ concept: 'Fecha de Otorgamiento', valor: solicitud.factura.fecha_otorga });
    this.invoiceDetails.push({ concept: 'Fecha de Vencimiento', valor: solicitud.factura.fecha_vence });
    this.invoiceDetails.push({ concept: 'Monto de la Factura', valor: Currency.format(solicitud.factura.monto) });
    this.invoiceDetails.push({ concept: 'Descuento por Pronto Pago', valor: Currency.format(solicitud.factura.pronto_pago) });
    this.invoiceDetails.push({ concept: 'IVA', valor: Currency.format(solicitud.iva) });
    this.invoiceDetails.push({ concept: 'Subtotal del Descuento', valor: Currency.format(solicitud.subtotal) });
    this.invoiceDetails.push({ concept: 'Total a Recibir', valor: Currency.format(solicitud.total) });

  }

  // Mostrar modal para agregar comentario
  mostrarModalComentario() {
    this.modalComentarioVisible = true;
  }

  // Guardar comentario y cerrar modal
  guardarComentario() {
    console.log('Comentario guardado:', this.comentario);
    this.modalComentarioVisible = false;
  }

  // Cancelar comentario sin guardar
  cancelarComentario() {
    this.comentario = ''; // Limpiar el comentario
    this.modalComentarioVisible = false;
  }

  // Mostrar modal para confirmar acción
  confirmarSolicitud(accion:string) {
    this.modalAccionVisible = true;
    this.accion = accion;
  }

  // Ejecutar acción confirmada (en este ejemplo solo se registra en consola)
  ejecutarAccion() {
    if(this.accion == "aprobar"){
      this.loading = true;
      const id_aprobador = this.storageProvider.userIDSession as string;
      this.synergyProvider.approveRequest(this.currentSolicitud.id.toString(), id_aprobador, this.comentario).then(
        (resp)=>{
          this.messageService.add({  severity: 'success', summary: 'Aprobación', detail: "La solicitud se ha aprobado exitosamente." });
          this.loading = false;
          this.modalAccionVisible = false;
          setTimeout(() => {
            this.router.navigate(['/solicitudes']);
          }, 2000);
        },
        (err:any)=>{
          console.log(err)
          this.loading = false;
          this.modalAccionVisible = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
        }
      )
    }else{
      this.loading = true;
      const id_aprobador = this.storageProvider.userIDSession as string;
      this.synergyProvider.denyRequest(this.currentSolicitud.id.toString(), id_aprobador, this.comentario).then(
        (resp)=>{
          this.messageService.add({  severity: 'success', summary: 'Denegación', detail: "La solicitud se ha denegado exitosamente." });
          this.loading = false;
          this.modalAccionVisible = false;
          setTimeout(() => {
            this.router.navigate(['/solicitudes']);
          }, 2000);
        },
        (err:any)=>{
          console.log(err)
          this.loading = false;
          this.modalAccionVisible = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
        }
      )
    }
  }

  // Cancelar acción sin ejecutarla
  cancelarAccion() {
    this.modalAccionVisible = false;
  }

  // Denegar solicitud (en este ejemplo solo se registra en consola)
  denegarSolicitud(accion:string) {
    this.modalAccionVisible = true;
    this.accion = accion;
  }

    // Función para redirigir a /solicitudes
    regresarALaLista() {
      this.router.navigate(['/solicitudes']);
    }
}
