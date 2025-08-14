import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroment';
import { LocalStorageProvider } from './local-storage.provider';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorHttp, HTTP_STATUS_CODE } from '../models/http/error-http';
import { Router } from '@angular/router';

/*
  Http Provider
  Encargado de realizar los http request a los endpoints
 */
@Injectable()
export class HttpProvider {



    constructor(
        private http: HttpClient,
        private storeProv: LocalStorageProvider,
        private router: Router
    ) {

    }

    //   public http_error: ErrorHttp;

    post(endpoint: string, payload?: any, tokenMemory?: string) {
        return new Promise<any>((resolve, reject) => {

            let peticion = environment.apiURL + endpoint;
            console.log("peticion http", peticion);
            let headers = new HttpHeaders();
            const token = this.storeProv.jwtSession;
            if (token !== null) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
            } else {
                // Se setea el token en dado caso que se
                // necesite realizar una operacion como restablecer contraseña
                if (tokenMemory) {
                    headers = new HttpHeaders({ 'Authorization': `Bearer ${tokenMemory}` })
                }
            }

            console.log("Llamando al endpoint: ", endpoint, payload);
            this.http.post(
                peticion,
                payload,
                {
                    headers,
                    observe: 'response'
                }
            ).subscribe((response) => {
                this.evaluateStatus(resolve, reject, response);

            }, (error: HttpErrorResponse) => {
                console.log(error)
                this.evaluateStatus(resolve, reject, error);
            });

        });
    }

    patch(endpoint: string, payload?: any, tokenMemory?: string) {
        return new Promise<any>((resolve, reject) => {

            let peticion = environment.apiURL + endpoint;
            let headers = new HttpHeaders();
            const token = this.storeProv.jwtSession;
            if (token !== null) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
            } else {
                // Se setea el token en dado caso que se
                // necesite realizar una operacion como restablecer contraseña
                if (tokenMemory) {
                    headers = new HttpHeaders({ 'Authorization': `Bearer ${tokenMemory}` })
                }
            }

            console.log("Llamando al endpoint (PATCH): ", endpoint, payload);
            this.http.patch(
                peticion,
                payload,
                {
                    headers,
                    observe: 'response'
                }
            ).subscribe((response) => {
                this.evaluateStatus(resolve, reject, response);

            }, (error: HttpErrorResponse) => {
                console.log(error)
                this.evaluateStatus(resolve, reject, error);
            });

        });
    }

    // Descarga binaria (Blob) por GET (para archivos como Excel)
    getBlob(endpoint: string, tokenMemory?: string) {
        return new Promise<Blob>((resolve, reject) => {
            const peticion = environment.apiURL + endpoint;
            let headers = new HttpHeaders();
            const token = this.storeProv.jwtSession;
            if (token !== null) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
            } else if (tokenMemory) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${tokenMemory}` })
            }

            console.log("Llamando (blob) al endpoint: ", endpoint);
            this.http.get(peticion, {
                headers,
                observe: 'response',
                responseType: 'blob' as 'json'
            }).subscribe((response: any) => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.body as Blob);
                } else {
                    this.evaluateStatus(resolve, reject, response);
                }
            }, (error: HttpErrorResponse) => {
                console.log(error)
                // Si viene blob con error, intentar leer el mensaje
                this.evaluateStatus(resolve, reject, error);
            });
        });
    }

    // Descarga binaria (Blob) por POST (para archivos como Excel)
    postBlob(endpoint: string, payload?: any, tokenMemory?: string) {
        return new Promise<Blob>((resolve, reject) => {
            const peticion = environment.apiURL + endpoint;
            console.log("Llamando (blob) al endpoint: ", endpoint, payload);
            let headers = new HttpHeaders();
            const token = this.storeProv.jwtSession;
            if (token !== null) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
            } else if (tokenMemory) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${tokenMemory}` })
            }

            this.http.post(peticion, payload, {
                headers,
                observe: 'response',
                responseType: 'blob' as 'json'
            }).subscribe((response: any) => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.body as Blob);
                } else {
                    this.evaluateStatus(resolve, reject, response);
                }
            }, (error: HttpErrorResponse) => {
                console.log(error)
                this.evaluateStatus(resolve, reject, error);
            });
        });
    }

    put(endpoint: string, payload?: any, tokenMemory?: string) {
        return new Promise<any>((resolve, reject) => {

            let peticion = environment.apiURL + endpoint;
            console.log("peticion http", peticion);
            let headers = new HttpHeaders();
            const token = this.storeProv.jwtSession;
            if (token !== null) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
            } else {
                // Se setea el token en dado caso que se
                // necesite realizar una operacion como restablecer contraseña
                if (tokenMemory) {
                    headers = new HttpHeaders({ 'Authorization': `Bearer ${tokenMemory}` })
                }
            }

            console.log("Llamando al endpoint: ", endpoint, payload);
            this.http.put(
                peticion,
                payload,
                {
                    headers,
                    observe: 'response'
                }
            ).subscribe((response) => {
                this.evaluateStatus(resolve, reject, response);


            }, (error: HttpErrorResponse) => {
                console.log(error)
                this.evaluateStatus(resolve, reject, error);
            });

        });
    }

    get(endpoint: string, payload?: any, tokenMemory?: string) {
        return new Promise<any>((resolve, reject) => {

            let peticion = environment.apiURL + endpoint;
            let headers = new HttpHeaders();
            const token = this.storeProv.jwtSession;
            if (token !== null) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
            } else {
                // Se setea el token en dado caso que se
                // necesite realizar una operacion como restablecer contraseña
                if (tokenMemory) {
                    headers = new HttpHeaders({ 'Authorization': `Bearer ${tokenMemory}` })
                }
            }

            console.log("Llamando al endpoint: ", endpoint, payload);
            this.http.get(
                peticion,
                {
                    headers,
                    observe: 'response'
                }
            ).subscribe((response) => {
                this.evaluateStatus(resolve, reject, response);


            }, (error: HttpErrorResponse) => {
                console.log(error)
                this.evaluateStatus(resolve, reject, error);
            });

        });
    }

    delete(endpoint: string, payload?: any) {
        return new Promise<any>((resolve, reject) => {

            let peticion = environment.apiURL + endpoint;
            let headers = new HttpHeaders();
            const token = this.storeProv.jwtSession;
            if (token !== null) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
            }

            console.log("Llamando al endpoint: ", endpoint, payload);
            this.http.delete(
                peticion,
                {
                    headers,
                    observe: 'response'
                }
            ).subscribe((response) => {
                this.evaluateStatus(resolve, reject, response);


            }, (error: HttpErrorResponse) => {
                console.log(error)
                this.evaluateStatus(resolve, reject, error);
            });

        });
    }

    evaluateStatus(resolve: any, reject: any, response: any) {
        let message = "";

        if (response instanceof HttpErrorResponse) {
            message = response?.error?.message ? response?.error?.message : "";
        } else {
            message = response?.body?.message ? response?.body?.message : "";
        }

        

        switch (response.status) {
            case HTTP_STATUS_CODE.OK: {

                resolve(response.body);
                break;
            }
            case HTTP_STATUS_CODE.CREATED: {

                resolve(response.body);
                break;
            }
            case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR: {

                reject(new ErrorHttp(1, message, null, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR));
                break;
            }
            case HTTP_STATUS_CODE.NOT_FOUND: {

                reject(new ErrorHttp(1, message, null, HTTP_STATUS_CODE.NOT_FOUND));
                break;
            }
            case HTTP_STATUS_CODE.CONFLICT: {

                reject(new ErrorHttp(1, message, null, HTTP_STATUS_CODE.CONFLICT));
                break;
            }
            case HTTP_STATUS_CODE.FORBIDDEN: {

                reject(new ErrorHttp(1, message, null, HTTP_STATUS_CODE.FORBIDDEN));
                break;
            }
            case HTTP_STATUS_CODE.UNAUTHORIZED: {
                reject(new ErrorHttp(1, message, null, HTTP_STATUS_CODE.UNAUTHORIZED));
                break;
            }
            case HTTP_STATUS_CODE.BAD_REQUEST: {

                reject(new ErrorHttp(1, message, null, HTTP_STATUS_CODE.BAD_REQUEST));
                break;
            }
            case HTTP_STATUS_CODE.METHOD_NOT_ALLOWED: {

                reject(new ErrorHttp(1, response.message, null, HTTP_STATUS_CODE.METHOD_NOT_ALLOWED));
                break;
            }
            case 0: {

                reject(new ErrorHttp(1, response.message, null, 0));
                break;
            }
        }
    }

}
