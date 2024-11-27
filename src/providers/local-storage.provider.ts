import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageProvider {
    public static JWT_KEY = "JWT0001";
    public static USERNAME_KEY = "USERNAME002";
    public static USERID_KEY = "USERID003";

    constructor() {}

    set jwtSession(token: string) {
        localStorage.setItem(LocalStorageProvider.JWT_KEY, token);
    }

    get jwtSession(): string | null {
        return localStorage.getItem(LocalStorageProvider.JWT_KEY);
    }

    set userNameSession(user: string) {
        localStorage.setItem(LocalStorageProvider.USERNAME_KEY, user);
    }

    get userNameSession(): string | null {
        return localStorage.getItem(LocalStorageProvider.USERNAME_KEY);
    }

    set userIDSession(id: string) {
        localStorage.setItem(LocalStorageProvider.USERID_KEY, id);
    }

    get userIDSession(): string | null {
        return localStorage.getItem(LocalStorageProvider.USERID_KEY);
    }

    clearSession() {
        localStorage.removeItem(LocalStorageProvider.JWT_KEY);
        localStorage.removeItem(LocalStorageProvider.USERNAME_KEY);
    }
}