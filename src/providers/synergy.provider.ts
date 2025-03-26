import { Injectable } from '@angular/core';
import { HttpProvider } from './http.provider';
import { Root0, Root10, Root11, Root12, Root13, Root14, Root15, Root16, Root17,Root17u, Root18, Root19 } from './interface-http';
import { Factura } from '../models/factura.model';

@Injectable()
export class SynergyProvider {

  constructor(
    public httpProvider: HttpProvider
  ) {

  }

  login(email: string, password: string) {
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

  logout(id_usuario: number) {
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
  resetPassword(email: string, newpassword: string, tokenMemory: string) {
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
  requestFactoring(factura: Factura, nombre: string, cargo: string, correo: string) {
    const sender = {
      data: {
        factura: factura,
        nombre_solicitante: nombre,
        cargo: cargo,
        email: correo
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
  getInvoiceDetail(no_factura: string, tokenMemory: string) {
    return new Promise<Root10>((resolve, reject) => {
      this.httpProvider.get(`factura/obtener-detalle-factura?no_factura=${no_factura}`,{},tokenMemory).then(data => {
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

    /**
     * Obtiene las metricas del panel de solicitudes con filtros
     */
    getRequestPanel(filtros: any = {}) {
      // Creamos un objeto de parámetros que incluirá filtros adicionales, si es necesario
      const params: any = {
        ...filtros // Añadimos los filtros aquí
      };

      // Convertimos el objeto params en una cadena de consulta URL
      const queryString = new URLSearchParams(params).toString();

      return new Promise<Root15>((resolve, reject) => {
        this.httpProvider.get(`solicitud/panel-solicitudes?${queryString}`).then(data => {
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    }


  getDetailRequest(id: string){
    return new Promise<Root13>((resolve, reject) => {
      this.httpProvider.get(`solicitud/obtener-detalle-solicitud?id=${id}`).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  approveRequest(id: string, id_aprobador: string, comentario?: string, id_usuario_bitacora?: string, nombre_usuario_bitacora?: string) {
    return new Promise<Root12>((resolve, reject) => {
      const sender = {
        id_aprobador: id_aprobador,
        comentario: comentario,
        id_usuario_bitacora: id_usuario_bitacora,
        nombre_usuario_bitacora: nombre_usuario_bitacora
      }
      this.httpProvider.put(`solicitud/aprobar?id=${id}`,sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  denyRequest(id: string,  id_aprobador: string, comentario?: string, id_usuario_bitacora?: string, nombre_usuario_bitacora?: string) {
    return new Promise<Root12>((resolve, reject) => {
      const sender = {
        id_aprobador: id_aprobador,
        comentario: comentario,
        id_usuario_bitacora: id_usuario_bitacora,
        nombre_usuario_bitacora: nombre_usuario_bitacora
      }
      this.httpProvider.put(`solicitud/desaprobar?id=${id}`,sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }


  getUsers() {
    return new Promise<Root16>((resolve, reject) => {
      const sender = {
      }
      this.httpProvider.get(`usuario/listar-usuarios`,sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }
 /**
  *
  * Obtiene el rol con todos los permisos
  */
  getRole(id:string) {
    return new Promise<Root17>((resolve, reject) => {
      const sender = {
      }
      this.httpProvider.get(`permiso/listar-permisos?id_rol=${id}`,sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

   /**
  *
  * Obtiene todos los menus
  */
   getMenus() {
    return new Promise<Root18>((resolve, reject) => {
      const sender = {
      }
      this.httpProvider.get(`permiso/listar-menus`,sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }


   /**
  *
  * Actualiza los permisos de un rol
  */
   updateRol(payload:any) {
    return new Promise((resolve, reject) => {
      const sender = {
      }
      this.httpProvider.put(`permiso/actualizar-permisos`,payload).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

     /**
  *
  * Obtiene todos los roles
  */
     getRoles() {
      return new Promise<Root19>((resolve, reject) => {
        const sender = {
        }
        this.httpProvider.get(`permiso/listar-roles`).then(data => {
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    }

  getUserById(id: string) {
    return new Promise<Root17u>((resolve, reject) => {
      const sender = {
      }
      this.httpProvider.get(`usuario/detalle-usuario?usuario_id=${id}`,sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  editUserById(usuario_id: string, nombres?: string, apellidos?: string, password?: string, id_rol?: string) {
    return new Promise<Root17u>((resolve, reject) => {
      const sender: any = {
        nombres: nombres,
        apellidos: apellidos,
        id_rol: id_rol
      };
      if (password) sender.password = password;

      this.httpProvider.put(`usuario/actualizar-usuario?usuario_id=${usuario_id}`, sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  createUser(nombres?: string, apellidos?: string, email?: string, id_rol?: string) {
    return new Promise<Root17u>((resolve, reject) => {
      const sender: any = {
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        id_rol: id_rol
      };

      this.httpProvider.post(`usuario/crear-usuario`, sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  resetUserById(id: string) {
    return new Promise<any>((resolve, reject) => {
      this.httpProvider.post(`usuario/restablecer-contraseña?usuario_id=${id}`)
        .then(data => {
          resolve(data); // Resuelve la respuesta completa
        })
        .catch(error => {
          reject(error); // Rechaza con el error
        });
    });
  }

  updateUserStatusById(usuario_id: string, activo?: boolean) {
    return new Promise<Root17u>((resolve, reject) => {
      const sender: any = {
        usuario_id: usuario_id,
        activo: activo,
      };

      this.httpProvider.post(`usuario/cambiar-estado-usuario`, sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  deleteUserStatusById(id: string) {
    return new Promise<Root17u>((resolve, reject) => {
      const sender: any = {
      };
      this.httpProvider.delete(`usuario/eliminar-usuario?usuario_id=${id}`, sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  deleteRole(id: string) {
    return new Promise<any>((resolve, reject) => {
      const sender: any = {
      };
      this.httpProvider.delete(`permiso/eliminar-rol?rol_id=${id}`, sender).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getRequestDesem(page: number, per_page: number, filtros: any = {}) {
    // Creamos un objeto de parámetros que incluirá filtros adicionales, si es necesario
    const params: any = {
      page,
      per_page,
      ...filtros // Añadimos los filtros aquí
    };

    // Convertimos el objeto params en una cadena de consulta URL
    const queryString = new URLSearchParams(params).toString();

    return new Promise<Root12>((resolve, reject) => {
      this.httpProvider.get(`desembolso/obtener-desembolsos?${queryString}`).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

}
