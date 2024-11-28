import { Injectable } from '@angular/core';
import { HttpProvider } from './http.provider';
import { Root0, Root10, Root11, Root12, Root14  } from './interface-http';
import { Factura } from '../models/factura.model';

@Injectable()
export class SynergyProvider {

  constructor(
    public httpProvider: HttpProvider
  ) {

  }

  login(email:string, password: string){
    return new Promise<Root11>((resolve, reject) => {
      const sender = {
        email,
        password
      }
      this.httpProvider.post(`usuario/inicio-sesion`, sender).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error);
      })
    });
  }

  logout(id_usuario:number){
    return new Promise<Root11>((resolve, reject) => {
      const sender = {}
      this.httpProvider.post(`usuario/cerrar-sesion?usuario_id=${id_usuario}`, sender).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error);
      })
    });
  }
  
  /**
   * Restablece la contraseña para el usuario que ingresa por primera vez y aquellos que se les olvida la contraseña
   *
   */
  resetPassword(email: string, newpassword: string, tokenMemory: string){
    return new Promise<Root14>((resolve, reject) => {
      const sender = {
        email: email,
        nueva_contrasena: newpassword
      }
      this.httpProvider.post(`usuario/cambiar-contraseña`, sender, tokenMemory).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error);
      })
    });
  }

  /**
   * Solicita factoraje a synergy
   *
   */
  requestFactoring(factura: Factura, nombre:string, cargo:string, correo:string){
    const sender = {
      data:{
        factura: factura,
        nombre_solicitante:  nombre,
        cargo: cargo,
        correo_electronico: correo
      }
    }
    return new Promise<Root0>((resolve, reject) => {
      this.httpProvider.post(`factura/solicitar-pago-factura`, sender).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error);
      })
    });
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

/**
   * Obtiene la lista de solicitudes con filtros y paginación
   */
getRequest(page: number, per_page: number, filtros: any = {}) {
  // Creamos un objeto de parámetros que incluirá filtros adicionales, si es necesario
  const params: any = {
    page,
    per_page,
    ...filtros // Añadimos los filtros aquí
  };

  // Convertimos el objeto params en una cadena de consulta URL
  const queryString = new URLSearchParams(params).toString();

  return new Promise<Root12>((resolve, reject) => {
    this.httpProvider.get(`solicitud/obtener-solicitudes?${queryString}`).then(data => {
      resolve(data);
    }).catch(error => {
      reject(error);
    });
  });
}

}
