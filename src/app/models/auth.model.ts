export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  idUsuario: number;
  idRol?: number;
  legajo: string;
  nombre: string;
  apellido: string;
  email: string;
  rol?: string;
}

export type UserRole = 'ADMINISTRADOR' | 'SUPERVISOR' | 'OPERADOR';

export interface LoginResponse {
  token: string;
  usuario: AuthUser;
}
