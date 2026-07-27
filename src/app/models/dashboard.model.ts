export interface DashboardResumen {
  filtros: Record<string, string | number | undefined>;
  kpis: {
    metrosTotales: number;
    pozosCompletados: number;
    ropPromedio: number;
    adherenciaDiseno: number;
  };
  opciones: {
    fases: string[];
    equipos: string[];
    operadores: string[];
  };
  graficos: {
    metrosPorRoca: NumericGroup[];
    distribucionTipoPozo: NumericGroup[];
    metrosPorEquipo: NumericGroup[];
    metrosPorFase: NumericGroup[];
    metrosPorBanco: NumericGroup[];
    estados: NumericGroup[];
    rankingOperadores: NumericGroup[];
    precisionPorFase: PrecisionGroup[];
    precisionPorBanco: PrecisionGroup[];
    precisionPorOperador: PrecisionGroup[];
    ropPorRoca: Array<{ name: string; ropPromedio: number }>;
  };
}

export interface NumericGroup {
  name: string;
  value: number;
}

export interface PrecisionGroup {
  name: string;
  diseno: number;
  perforado: number;
  real: number;
}
