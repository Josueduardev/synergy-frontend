import { Factura } from './factura.model';

export interface Solicitud {
  contacto:       string;
  email:          string;
  estado:         string;
  factura:        Factura;
  id:             number;
  id_estado:      number;
  iva:            number;
  nombre_cliente: string;
  subtotal:       number;
  total:          number;
}
