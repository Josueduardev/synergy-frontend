import { Injectable } from '@angular/core';
import { HttpProvider } from './http.provider';
import { Root10 } from './interface-http';

@Injectable()
export class SynergyProvider {

  constructor(
    public httpProvider: HttpProvider
  ) {

  }

  /**
   * Obtiene el detalle de factura para pronto pago
   * 
   */
  getInvoiceDetail(no_factura: string) {
    return new Promise<Root10>((resolve, reject) => {
      this.httpProvider.get(`factura/obtener-detalle-factura?no_factura=${no_factura}`).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error);
      })

    });
  }


}
