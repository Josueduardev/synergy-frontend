import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { SharedComponent } from '../../components/shared/shared.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogModule, FormsModule],
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

  // Datos de la cesión de facturaje
  detallesCesion = [
    { concepto: 'Factura N.°', valor: '123456' },
    { concepto: 'Fecha de Otorgamiento', valor: '20/11/2023' },
    { concepto: 'Fecha de Vencimiento', valor: '18/09/2024' },
    { concepto: 'Monto de la Factura', valor: '$15,000.00' },
    { concepto: 'Descuento por Pronto Pago', valor: '$450.00' },
    { concepto: 'IVA', valor: '$67.50' },
    { concepto: 'Subtotal de Descuento', valor: '$517.50' },
    { concepto: 'Total a Recibir', valor: '$14,482.50' }
  ];

  // Variables para manejar el modal de comentarios y acción
  comentario: string = '';
  modalComentarioVisible: boolean = false;
  modalAccionVisible: boolean = false;

  constructor(private sharedComponent: SharedComponent, private router: Router) {}

  ngOnInit(): void {
    // Cerrar el sidebar al cargar la página
    this.sharedComponent.sidebarVisible = false;
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
  confirmarSolicitud() {
    this.modalAccionVisible = true;
  }

  // Ejecutar acción confirmada (en este ejemplo solo se registra en consola)
  ejecutarAccion() {
    console.log('Acción ejecutada');
    this.modalAccionVisible = false;
  }

  // Cancelar acción sin ejecutarla
  cancelarAccion() {
    console.log('Acción cancelada');
    this.modalAccionVisible = false;
  }

  // Denegar solicitud (en este ejemplo solo se registra en consola)
  denegarSolicitud() {
    this.modalAccionVisible = true;
  }

    // Función para redirigir a /solicitudes
    regresarALaLista() {
      this.router.navigate(['/solicitudes']);
    }
}
