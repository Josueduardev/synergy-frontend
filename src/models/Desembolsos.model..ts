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

// Tipado para la respuesta del endpoint de listado de desembolsos
// Backend: routes/desembolsos_route.py -> obtener_desembolsos
export interface ProveedorListado {
  id: string;
  razon_social: string;
  correo_electronico: string;
  telefono: string;
}

export interface FacturaListado {
  id: number;
  no_factura: string;
  monto: number;
  fecha_emision: string;
  fecha_vence: string;
  proveedor: ProveedorListado;
}

export interface SolicitudListado {
  id: number;
  nombre_cliente: string;
  contacto: string;
  email: string;
  iva: number;
  subtotal: number;
  total: number;
  id_estado: number;
  estado: string | null;
  factura: FacturaListado;
}

export interface DesembolsoListado {
  id: number;
  fecha_desembolso: string;
  monto_final: number;
  metodo_pago: string;
  estado: number;
  fecha_actualizacion: string | null;
  dias_restantes: number;
  solicitud: SolicitudListado;
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
