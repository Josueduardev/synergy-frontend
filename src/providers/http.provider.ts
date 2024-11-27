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

            let peticion = environment.apiURL  + endpoint;
            console.log("peticion http", peticion);
            let headers = new HttpHeaders();
            const token = this.storeProv.jwtSession;
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
            ).subscribe((response) => {
                this.evaluateStatus(resolve, reject, response);


            }, (error: HttpErrorResponse) => {
                console.log(error)
                this.evaluateStatus(resolve, reject, error);
            });

        });
    }

    get(endpoint: string, payload?: any) {
        return new Promise<any>((resolve, reject) => {

            let peticion = environment.apiURL + endpoint;
            let headers = new HttpHeaders();
            const token = this.storeProv.jwtSession;
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
        }
    }

}
