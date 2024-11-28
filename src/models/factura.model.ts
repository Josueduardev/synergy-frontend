import { Proveedor } from './proveedor.model';
export interface Factura {
    cliente?:            string;
    dias_restantes?:     number;
    fecha_otorgamiento?: string;
    fecha_vencimiento?:  string;
    iva?:                number;
    monto_factura?:      number;
    no_factura?:         string;
    pronto_pago?:        number;
    subtotal_descuento?: number;
    total_a_recibir?:    number;
    proveedor:     Proveedor;
}
