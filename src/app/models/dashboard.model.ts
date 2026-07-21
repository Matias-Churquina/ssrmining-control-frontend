export interface DashboardResumen {
  filtros: Record<string, string | number | undefined>;
  kpis: {
    metrosTotales: number;
    pozosCompletados: number;
    ropPromedio: number;
    adherenciaDiseno: number;
  };
  graficos: {
    metrosPorRoca: NumericGroup[];
    distribucionTipoPozo: NumericGroup[];
    metrosPorEquipo: NumericGroup[];
    metrosPorFase: NumericGroup[];
    metrosPorBanco: NumericGroup[];
    rankingOperadores: NumericGroup[];
    ropPorRoca: Array<{ name: string; ropPromedio: number }>;
  };
}

export interface NumericGroup {
  name: string;
  value: number;
}
