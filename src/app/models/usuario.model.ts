export interface Rol {
  idRol: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
}

export interface Usuario {
  idUsuario: number;
  idRol: number;
  legajo: string;
  nombre: string;
  apellido: string;
  email: string;
  activo: boolean;
  ultimoAcceso?: string;
  rol?: Rol;
}
