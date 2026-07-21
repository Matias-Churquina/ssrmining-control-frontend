export interface LoginRequest {
  legajo: string;
  password: string;
}

export interface AuthUser {
  idUsuario: number;
  idRol: number;
  legajo: string;
  nombre: string;
  apellido: string;
  email: string;
  rol?: string;
}

export interface LoginResponse {
  token: string;
  usuario: AuthUser;
}
