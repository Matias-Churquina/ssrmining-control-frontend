import { Injectable, signal } from '@angular/core';
import { AuthUser, LoginResponse } from '../models/auth.model';

const TOKEN_KEY = 'ssrmining_token';
const USER_KEY = 'ssrmining_user';

@Injectable({ providedIn: 'root' })
export class SesionService {
  readonly usuarioActual = signal<AuthUser | null>(this.readUser());

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  get estaAutenticado(): boolean {
    return Boolean(this.token);
  }

  guardarSesion(response: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.usuario));
    this.usuarioActual.set(response.usuario);
  }

  cerrarSesion(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.usuarioActual.set(null);
  }

  private readUser(): AuthUser | null {
    const rawUser = localStorage.getItem(USER_KEY);
    return rawUser ? JSON.parse(rawUser) as AuthUser : null;
  }
}
