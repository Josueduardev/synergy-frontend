import { Factura } from './factura.model';
import { Proveedor } from './proveedor.model';

export interface desembolso {
  contacto:       string;
  email:          string;
  estado:         number;
  factura:        Factura;
  proveedor:      Proveedor;
  id:             number;
  id_estado?:      number;
  iva:            number;
  nombre_cliente: string;
  subtotal:       number;
  total:            number;
  fecha_solicitud: string;
  fecha_aprobacion: string;
  comentario: string;
}

export interface DetalleDesembolso {
  estado: number;
  fecha_desembolso: string;
  id: number;
  metodo_pago: string;
  monto_final: number;
  no_transaccion: string;
  proveedor: {
    correo_electronico: string;
    id: string;
    razon_social: string;
    telefono: string;
  };
}

export interface DetalleDesembolsoResponse {
  code: number;
  data: {
    desembolso: DetalleDesembolso;
  };
  message: string;
}
