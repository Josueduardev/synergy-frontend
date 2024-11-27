import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SynergyProvider } from '../../../providers/synergy.provider';
import { Factura } from '../../../models/factura.model';
import { Currency, Email } from '../../../utility/global.util';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ErrorHttp } from '../../../models/http/error-http';

@Component({
  selector: 'solicitud-prontopago',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    DialogModule, 
    CheckboxModule, 
    FormsModule, 
    ButtonModule, 
    InputTextModule,
    ToastModule
  ],
  providers: [SynergyProvider, MessageService],
  templateUrl: './solicitud-prontopago.page.html',
  styleUrls: ['./solicitud-prontopago.page.scss']
})
export class SolicitudProntoPagoPage implements OnInit {
  invoiceDetails: any = [];
  facturaProveedor!: Factura;
  loading = false;
  enviada = false;
  isFormInvalid = false;
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
    private synergyProvider: SynergyProvider,
    private messageService: MessageService
  ) {

  }

  async ngOnInit() {
    try {
      const noFactura = this.route.snapshot.queryParamMap.get('no_factura');
      console.log(noFactura)
      if (noFactura) {
        const { data } = await this.synergyProvider.getInvoiceDetail(noFactura);
        if (data && data.factura) {
          this.facturaProveedor = data.factura;
          this.setDetail();
        }
      } else {
        this.facturaNotFound = true;
      }
    } catch (err) {
      this.facturaNotFound = true;
      console.log(err);
    }
  }

  setDetail() {
    const factura = this.facturaProveedor;
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

  async send() {

    try {
      if (!this.applicant.name || !this.applicant.role || !this.isValidEmail(this.applicant.email)) {
        this.isFormInvalid = true;
        return;
      }

      this.isFormInvalid = false;
      
      
      this.loading = true;
      const response = await this.synergyProvider.requestFactoring(
        this.facturaProveedor,
        this.applicant.name,
        this.applicant.role,
        this.applicant.email
      );
      console.log(response)
      if(response){
        setTimeout(() => {
          this.modalVisible = false;
          this.loading = false;
          this.enviada = true;
        }, 2000);
      }
    } catch (error: any) {
      console.log(error)
      this.modalVisible = false;
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    }

  }

  isValidEmail(email: string): boolean {
    return Email.isValid(email);
  }
}
