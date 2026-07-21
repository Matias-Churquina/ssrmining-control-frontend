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
}
