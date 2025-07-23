// public.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageProvider } from '../providers/local-storage.provider';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(private storeProv: LocalStorageProvider, private router: Router) {}

  canActivate(): boolean {
    const token = this.storeProv.jwtSession;
    if (token) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
