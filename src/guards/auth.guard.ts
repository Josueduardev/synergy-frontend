import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageProvider } from '../providers/local-storage.provider';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardApp implements CanActivate {
    constructor(private storeProv: LocalStorageProvider, private router: Router) {}

    canActivate(): boolean {
        const token = this.storeProv.jwtSession;

        if (token) {
            return true; 
        }

        this.router.navigate(['/login']); 
        return false;
    }
}
