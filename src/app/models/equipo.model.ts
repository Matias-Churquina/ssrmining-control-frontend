export type EstadoEquipo = 'ACTIVO' | 'INACTIVO' | 'MANTENIMIENTO';

export interface Equipo {
  idEquipo: number;
  codigo: string;
  descripcion: string;
  modelo: string;
  estado: EstadoEquipo;
  fechaAlta?: string;
  fechaActualizacion?: string;
}

export interface EquipoOption {
  idEquipo: number;
  codigo: string;
  modelo?: string;
}
