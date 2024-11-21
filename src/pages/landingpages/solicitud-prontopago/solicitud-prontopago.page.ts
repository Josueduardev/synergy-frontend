import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'solicitud-prontopago',
  standalone: true,
  imports: [TableModule, DialogModule, CheckboxModule,FormsModule,ButtonModule, InputTextModule],
  templateUrl: './solicitud-prontopago.page.html',
  styleUrls: ['./solicitud-prontopago.page.scss']
})
export class SolicitudProntoPagoPage {
  invoiceDetails = [
    { concept: 'Factura N.º', amount: '123456' },
    { concept: 'Fecha de Otorgamiento', amount: '20/12/2023' },
    { concept: 'Fecha de Vencimiento', amount: '18/02/2024' },
    { concept: 'Monto de la Factura', amount: '$15,000.00' },
    { concept: 'Descuento por Pronto Pago', amount: '$450.00' },
    { concept: 'IVA', amount: '$67.50' },
    { concept: 'Subtotal del Descuento', amount: '$517.50' },
    { concept: 'Total a Recibir', amount: '$14,482.50' },
  ];

  termsAccepted = false;
  modalVisible = false;
  applicant = {
    name: '',
    role: '',
    email: '',
  };

  contentStyle = { backgroundColor: '#f8f9fa', color: '#333', borderRadius: '50px' };

  showModal() {
    this.modalVisible = true;
  }

  send() {
    console.log('Datos del Solicitante:', this.applicant);
    this.modalVisible = false;
  }
}
