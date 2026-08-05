export type EstadoPerforacion = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';

export interface Perforacion {
  idPerforacion: number;
  codigoPerforacion: string;
  fecha: string;
  fase: string;
  banco: number;
  malla: string;
  idPozo: string;
  tipoRoca: string;
  profundidadDiseno: number;
  metrosPerforados: number;
  profundidadReal: number;
  horaInicio: string;
  horaFin: string;
  tipoPozo: string;
  observaciones?: string;
  estado: EstadoPerforacion;
  idUsuarioRegistro: number;
  idEquipo: number;
  idSupervisorRevision?: number;
  fechaRevision?: string;
  motivoRechazo?: string;
  equipo?: {
    idEquipo: number;
    codigo: string;
    descripcion: string;
    modelo?: string;
    estado: string;
  };
  usuarioRegistro?: {
    idUsuario: number;
    legajo: string;
    nombre: string;
    apellido: string;
    email: string;
  };
  supervisorRevision?: {
    idUsuario: number;
    legajo: string;
    nombre: string;
    apellido: string;
    email: string;
  };
  calculos?: {
    duracionHoras: number;
    rop: number;
    adherencia: number;
  };
}
