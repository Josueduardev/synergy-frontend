import { Factura } from "../models/factura.model";

export interface Root10{
    data:{
        factura: Factura
    }
    message: string;
    code: number;
    statuscode?: number;
}

export interface Root0{
    data:any
    message: string;
    code: number;
    statuscode?: number;
}

export interface Root11 {
    code?:    number;
    data:    DataUSER;
    message?: string;
}
//PENDIENTE DE DEFINIR
// Cambiara dado cuando se tenga que obtener los permisos y rol
export interface DataUSER {
    email?:           string;
    nombre_completo: string;
    token:           string;
    usuario_id:      number;
}
