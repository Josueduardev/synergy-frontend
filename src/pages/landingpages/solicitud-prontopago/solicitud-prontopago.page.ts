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
import { EstadosSolicitud } from '../../../models/enums/global-solicitud.enum';
import { environment } from '../../../enviroments/enviroment';
import { LocalStorageProvider } from '../../../providers/local-storage.provider';

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
  currentToken = '';

  contentStyle = { backgroundColor: '#f8f9fa', color: '#333', borderRadius: '50px' };

  constructor(
    private route: ActivatedRoute,
    private synergyProvider: SynergyProvider,
    private messageService: MessageService,
    private storeProv: LocalStorageProvider,
  ) {

  }

  async ngOnInit() {
    try {
      // Buscar tanto 'hash' como 'no_factura' para compatibilidad
      const hash = this.route.snapshot.queryParamMap.get('hash');
      const noFactura = this.route.snapshot.queryParamMap.get('no_factura');
      const identificador = hash || noFactura;

      if (identificador) {
        // Si hay un identificador, cargar datos demo
        this.cargarDataDemo(identificador);
      } else {
        this.facturaNotFound = true;
      }
    } catch (err) {
      console.log(err);
      this.facturaNotFound = true;
    }
  }

  cargarDataDemo(identificador: string) {
    // Datos demo para mostrar la página funcionando
    this.facturaNotFound = false;
    this.facturaProveedor = {
      id: parseInt(identificador),
      no_factura: 'DTE-03-M001P001-000000000001403',
      estado: 0, // EstadosSolicitud.Pendiente
      fecha_otorga: '20-07-2025',
      fecha_vence: '20-08-2025',
      monto: 678.00,
      descuento_app: 45.20,
      iva: 0,
      subtotal: 632.80,
      total: 632.80,
      nombre_proveedor: 'IMPRESOS MULTIPLES, S.A. DE C.V.',
      // Agregar otras propiedades que pueda necesitar
    } as any;

    this.setDetail();
  }

  async setFactoraje(noFactura:string){
    if (noFactura) {
      const { data } = await this.synergyProvider.getInvoiceDetail(noFactura,this.currentToken);
      console.log(data)
      if (data) {
        this.facturaNotFound = false;
        this.facturaProveedor = data.factura;
        this.setDetail();
      }
    } else {
      this.facturaNotFound = true;
    }
  }

  validarEstadoPendinte(){
    const estado = this.facturaProveedor?.estado;
    if(estado === EstadosSolicitud.Pendiente){
      this.facturaNotFound = false;
      return true;
    }

    return false;
  }

  validarEstadoEnviada(){
    const estado = this.facturaProveedor?.estado;
    if(estado === EstadosSolicitud.Enviada){
      this.facturaNotFound = false;
      return true;
    }
    return false;
  }

  validarEstadoAprobada(){
    const estado = this.facturaProveedor?.estado;
    if(estado === EstadosSolicitud.Aprobada){
      this.facturaNotFound = false;
      return true;
    }
    return false;
  }

  validarEstadoDenegada(){
    const estado = this.facturaProveedor?.estado;
    if(estado === EstadosSolicitud.Denegada){
      this.facturaNotFound = false;
      return true;
    }
    return false;
  }

  validarEstadoCaducada(){
    const estado = this.facturaProveedor?.estado;
    if(estado === EstadosSolicitud.Caducada){
      this.facturaNotFound = false;
      return true;
    }
    return false;
  }

  setDetail() {
    const factura = this.facturaProveedor;
    // Limpiar array antes de agregar nuevos datos
    this.invoiceDetails = [];
    
    // Calcular días de factoraje
    const diasFactoraje = this.calcularDiasFactoraje(factura.fecha_otorga || '', factura.fecha_vence || '');
    
    // Ya no incluimos Factura N.º, Fecha de Otorgamiento y Fecha de Vencimiento
    // porque ahora están en la barra superior
    this.invoiceDetails.push({ concept: 'Días de Factoraje', valor: `${diasFactoraje} días` });
    this.invoiceDetails.push({ concept: 'Monto de la Factura', valor: Currency.format(factura.monto) });
    this.invoiceDetails.push({ concept: 'Descuento por Pronto Pago', valor: Currency.format(factura.descuento_app) });
    this.invoiceDetails.push({ concept: 'IVA', valor: Currency.format(factura.iva) });
    this.invoiceDetails.push({ concept: 'Subtotal del Descuento', valor: Currency.format(factura.subtotal) });
    this.invoiceDetails.push({ concept: 'Total a Recibir', valor: Currency.format(factura.total) });
  }

  calcularDiasFactoraje(fechaOtorga: string, fechaVence: string): number {
    try {
      // Convertir fechas del formato DD-MM-YYYY a Date
      const [diaOtorga, mesOtorga, anioOtorga] = fechaOtorga.split('-').map(Number);
      const [diaVence, mesVence, anioVence] = fechaVence.split('-').map(Number);
      
      const fechaOtorgaDate = new Date(anioOtorga, mesOtorga - 1, diaOtorga);
      const fechaVenceDate = new Date(anioVence, mesVence - 1, diaVence);
      
      // Calcular diferencia en milisegundos y convertir a días
      const diferenciaMilisegundos = fechaVenceDate.getTime() - fechaOtorgaDate.getTime();
      const diasDiferencia = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
      
      return diasDiferencia > 0 ? diasDiferencia : 0;
    } catch (error) {
      console.error('Error calculando días de factoraje:', error);
      return 0;
    }
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

      // Simular proceso de envío para demo
      console.log('Enviando solicitud demo:', {
        factura: this.facturaProveedor,
        solicitante: this.applicant
      });

      // Simular respuesta exitosa después de 2 segundos
      setTimeout(() => {
        this.modalVisible = false;
        this.loading = false;
        this.enviada = true;

        // Mostrar mensaje de éxito
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Éxito', 
          detail: 'Solicitud enviada correctamente en modo demo' 
        });

        // Cambiar estado a "Enviada" para mostrar la siguiente pantalla
        this.facturaProveedor.estado = 1; // EstadosSolicitud.Enviada
      }, 2000);

    } catch (error: any) {
      console.log(error);
      this.modalVisible = false;
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    }
  }

  isValidEmail(email: string): boolean {
    return Email.isValid(email);
  }
}
