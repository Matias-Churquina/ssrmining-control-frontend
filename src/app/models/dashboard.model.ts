export interface DashboardResumen {
  totales?: {
    perforaciones: number;
    pendientes: number;
    aprobadas: number;
    rechazadas: number;
  };
  metricas?: {
    metrosPerforados: number;
    profundidadDiseno: number;
    adherenciaPromedio: number;
    ropPromedio: number;
  };
  porEstado?: Array<{ estado: string; total: number }>;
  porEquipo?: Array<{ codigo: string; total: number; metrosPerforados: number }>;
}
