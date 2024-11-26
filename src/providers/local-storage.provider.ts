import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageProvider {
    public static JWT_KEY = "JWT0001";

    constructor() {}

    set jwtSession(token: string) {
        localStorage.setItem(LocalStorageProvider.JWT_KEY, token);
    }

    get jwtSession(): string | null {
        return localStorage.getItem(LocalStorageProvider.JWT_KEY);
    }

    clearSession() {
        localStorage.removeItem(LocalStorageProvider.JWT_KEY);
    }
}