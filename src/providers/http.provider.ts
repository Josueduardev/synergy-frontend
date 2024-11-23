import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroment';
import { LocalStorageProvider } from './local-storage.provider';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorHttp, HTTP_STATUS_CODE } from '../models/http/error-http';



/*
 Http Provider
 Encargado de realizar los http request a los endpoints
 */
@Injectable()
export class HttpProvider {



    constructor(
        private http: HttpClient,
        private storeProv: LocalStorageProvider,
    ) {

    }

    //   public http_error: ErrorHttp;

    post(endpoint: string, payload?: any) {
        return new Promise<any>((resolve, reject) => {

            let peticion = environment.apiURL + "/api/" + endpoint;
            console.log("peticion http", peticion);
            let headers = new HttpHeaders();
            // const token = this.storeProv.jwtSession;
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhjaGlua2U5N0BnbWFpbC5jb20iLCJleHAiOjE3MzIzODk1ODN9.Xe8OJH9AdSSB_53FfyxOBf5RVGDnm8H2TrP8MneDuiM';
            if (token !== null) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
            }

            console.log("Llamando al endpoint: ", endpoint, payload);
            this.http.post(
                peticion,
                payload,
                {
                    headers,
                    observe: 'response'
                }
            ).pipe(
                timeout(210000),
                catchError(e => {
                    console.log("timeout!!!!!");
                    return of(undefined);
                })
            ).subscribe((response) => {
                // console.log("jsonRespuesta:", data);
                if (response === undefined) {
                    reject(new ErrorHttp(1, `GATEWAY_TIMEOUT 504`, null));
                    return;
                }

                switch (response.status) {
                    case HTTP_STATUS_CODE.OK: {

                        resolve(response.body);
                        break;
                    }
                    case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR: {
                        const { message }: any = response.body;
                        reject(new ErrorHttp(1, `NTERNAL_SERVER_ERROR 500:\n ${message}`, null));
                        break;
                    }
                    case HTTP_STATUS_CODE.NOT_FOUND: {
                        const { message }: any = response.body;
                        reject(new ErrorHttp(1, `NOT_FOUND 404:\n ${message}`, null));
                        break;
                    }
                    case HTTP_STATUS_CODE.CONFLICT: {
                        const { message }: any = response.body;
                        reject(new ErrorHttp(1, `RESOURCE CONFLICT 409:\n ${message}`, null));
                        break;
                    }
                    case HTTP_STATUS_CODE.FORBIDDEN: {
                        const { message }: any = response.body;
                        reject(new ErrorHttp(1, `RESOURCE FORBIDDEN 403:\n ${message}`, null));
                        break;
                    }
                }





            }, (error) => {
                console.log("error endpoint:", endpoint);
                console.log("error message:", error);
                reject(new ErrorHttp(1, 'Ocurrio un problema con la conexión al servidor.', null));
            });

        });
    }

    get(endpoint: string, payload?: any) {
        return new Promise<any>((resolve, reject) => {

            let peticion = environment.apiURL + endpoint;
            let headers = new HttpHeaders();
            // const token = this.storeProv.jwtSession;
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhjaGlua2U5N0BnbWFpbC5jb20iLCJleHAiOjE3MzIzODk1ODN9.Xe8OJH9AdSSB_53FfyxOBf5RVGDnm8H2TrP8MneDuiM';
            if (token !== null) {
                headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
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
            case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR: {

                reject(new ErrorHttp(1, `NTERNAL_SERVER_ERROR 500:\n ${message}`, null));
                break;
            }
            case HTTP_STATUS_CODE.NOT_FOUND: {

                reject(new ErrorHttp(1, `NOT_FOUND 404:\n ${message}`, null));
                break;
            }
            case HTTP_STATUS_CODE.CONFLICT: {

                reject(new ErrorHttp(1, `RESOURCE CONFLICT 409:\n ${message}`, null));
                break;
            }
            case HTTP_STATUS_CODE.FORBIDDEN: {

                reject(new ErrorHttp(1, `RESOURCE FORBIDDEN 403:\n ${message}`, null));
                break;
            }
        }
    }

}
