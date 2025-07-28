import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401
                    || error.message.includes("Token de autorización inválido")
                    || error.message.includes("Token de autorización vencido")
                    || error.message.includes("El token proporcionado no corresponde al usuario")) {
                    localStorage.clear();
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}
