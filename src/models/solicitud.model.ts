import { Factura } from './factura.model';
import { Proveedor } from './proveedor.model';

export interface Solicitud {
  contacto:       string;
  email:          string;
  estado:         string;
  factura:        Factura;
  proveedor:      Proveedor;
  id:             number;
  id_estado:      number;
  iva:            number;
  nombre_cliente: string;
  subtotal:       number;
  total:          number;
}
