import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SynergyProvider } from '../../../providers/synergy.provider';
import { Factura } from '../../../models/factura.model';
import { Currency } from '../../../utility/Currency.util';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'solicitud-prontopago',
  standalone: true,
  imports: [CommonModule,TableModule, DialogModule, CheckboxModule, FormsModule, ButtonModule, InputTextModule],
  providers: [SynergyProvider],
  templateUrl: './solicitud-prontopago.page.html',
  styleUrls: ['./solicitud-prontopago.page.scss']
})
export class SolicitudProntoPagoPage implements OnInit {
  invoiceDetails: any = [];
  termsAccepted = false;
  modalVisible = false;
  applicant = {
    name: '',
    role: '',
    email: '',
  };
  facturaNotFound = false;

  contentStyle = { backgroundColor: '#f8f9fa', color: '#333', borderRadius: '50px' };

  constructor(
    private route: ActivatedRoute,
    private synergyProvider: SynergyProvider
  ) {

  }

  async ngOnInit() {
    try {
      const noFactura = this.route.snapshot.queryParamMap.get('no_factura');
      console.log(noFactura)
      if (noFactura) {
        const { data } = await this.synergyProvider.getInvoiceDetail(noFactura);
        this.setDetail(data.factura);
      } else {
        this.facturaNotFound = true;
      }
    } catch (err) {
      this.facturaNotFound = true;
      console.log(err);
    }
  }

  setDetail(factura: Factura) {
    this.invoiceDetails.push({ concept: 'Factura N.º', valor: factura.no_factura });
    this.invoiceDetails.push({ concept: 'Fecha de Otorgamiento', valor: factura.fecha_otorgamiento });
    this.invoiceDetails.push({ concept: 'Fecha de Vencimiento', valor: factura.fecha_vencimiento });
    this.invoiceDetails.push({ concept: 'Monto de la Factura', valor: Currency.format(factura.monto_factura) });
    this.invoiceDetails.push({ concept: 'Descuento por Pronto Pago', valor: Currency.format(factura.pronto_pago) });
    this.invoiceDetails.push({ concept: 'IVA', valor: Currency.format(factura.iva) });
    this.invoiceDetails.push({ concept: 'Subtotal del Descuento', valor: Currency.format(factura.subtotal_descuento) });
    this.invoiceDetails.push({ concept: 'Total a Recibir', valor: Currency.format(factura.total_a_recibir) });
  }

  showModal() {
    this.modalVisible = true;
  }

  send() {
    console.log('Datos del Solicitante:', this.applicant);
    this.modalVisible = false;
  }
}
