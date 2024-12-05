import { Solicitud } from './../models/solicitud.model';
import { Factura } from "../models/factura.model";
import { Usuario } from '../models/usuario.model';

// Obtener detalles de factura
export interface Root10{
    data:{
        factura: Factura
    }
    message: string;
    code: number;
    statuscode?: number;
}

// Solicitud de pronto pago
export interface Root0{
    data:any
    message: string;
    code: number;
    statuscode?: number;
}

// export interface Root11 {
//     code?:    number;
//     data:    DataUSER;
//     message?: string;
// }

//PENDIENTE DE DEFINIR
// Cambiara dado cuando se tenga que obtener los permisos y rol
// export interface DataUSER {
//     email?:           string;
//     nombre_completo: string;
//     token:           string;
//     usuario_id:      number;
// }

// Datos de sesion
export interface Root11 {
  code:    number;
  data:    Data;
  message: string;
}

export interface Data {
  access_token: string;
  change_password: number;
  expires_in:   number;
  usuario:      Usuario;
}

// Obtener solicitudes
export interface Root12 {
  data: {
      current_page: number;
      per_page: number;
      solicitudes: Solicitud;
      total_pages: number;
  };
  message: string;
  code: number;
}

// Obtener detalle de solicitud
export interface Root13 {
  data: {
      current_page: number;
      per_page: number;
      solicitud: Solicitud;
      total_pages: number;
  };
  message: string;
  code: number;
}

















export interface Root14 {
  code:    number;
  data:    {
    email: string;
    mensaje: string;
  };
  message: string;
}
