import { Factura } from "../models/factura.model";

export interface Root10{
    data:{
        factura: Factura
    }
    message: string;
    code: number;
    statuscode?: number;
}