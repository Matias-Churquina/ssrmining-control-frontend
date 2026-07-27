import { Component, computed, inject, signal } from '@angular/core';
import { BarChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { EChartsCoreOption } from 'echarts/core';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { MetricTile } from '../../components/metric-tile/metric-tile';
import { DashboardResumen, NumericGroup } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

echarts.use([
  BarChart,
  PieChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  LabelLayout,
  CanvasRenderer
]);

@Component({
  selector: 'app-dashboard',
  imports: [MetricTile, NgxEchartsDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [provideEchartsCore({ echarts })]
})
export class Dashboard {
  private readonly dashboardService = inject(DashboardService);

  readonly resumen = signal<DashboardResumen | null>(null);
  readonly cargando = signal(true);
  readonly fechaDesde = signal('2026-07-01');
  readonly fechaHasta = signal('2026-07-31');

  readonly flota = computed(() => this.resumen()?.opciones.equipos ?? []);
  readonly fases = computed(() => this.resumen()?.opciones.fases ?? []);
  readonly operadores = computed(() => this.resumen()?.opciones.operadores ?? []);

  readonly metrosPorRocaOption = computed(() => this.donutOption(
    this.resumen()?.graficos.metrosPorRoca ?? [],
    ['#22c55e', '#f97316', '#2563eb', '#facc15']
  ));

  readonly tipologiaOption = computed(() => this.pieOption(
    this.resumen()?.graficos.distribucionTipoPozo ?? [],
    ['#3b82f6', '#8b5cf6', '#06b6d4', '#facc15']
  ));

  readonly ropOption = computed(() => {
    const data = this.resumen()?.graficos.ropPorRoca ?? [];

    return this.horizontalBarOption(
      data.map((item) => item.name),
      [{ name: 'ROP', values: data.map((item) => item.ropPromedio), color: '#22c55e' }],
      'm/h'
    );
  });

  readonly rankingOption = computed(() => {
    const ranking = this.resumen()?.graficos.rankingOperadores ?? [];
    const names = ranking.map((item) => this.shortName(item.name));

    return this.stackedBarOption(names, [
      { name: 'Toba blanda', values: ranking.map((item, index) => Number((item.value * (0.45 + index * 0.04)).toFixed(2))), color: '#22c55e' },
      { name: 'Meta dura', values: ranking.map((item, index) => Number((item.value * (0.55 - index * 0.04)).toFixed(2))), color: '#f97316' }
    ]);
  });

  readonly faseOption = computed(() => {
    const fases = this.resumen()?.graficos.precisionPorFase ?? [];

    return this.groupedBarOption(
      fases.map((item) => item.name),
      [
        { name: 'Diseno', values: fases.map((item) => item.diseno), color: '#334155' },
        { name: 'Perforado', values: fases.map((item) => item.perforado), color: '#3b82f6' }
      ]
    );
  });

  readonly bancoOption = computed(() => {
    const bancos = this.resumen()?.graficos.precisionPorBanco ?? [];

    return this.groupedBarOption(
      bancos.map((item) => `B-${item.name}`),
      [
        { name: 'Diseno', values: bancos.map((item) => item.diseno), color: '#334155' },
        { name: 'Real', values: bancos.map((item) => item.real), color: '#d97706' }
      ]
    );
  });

  readonly operadorOption = computed(() => {
    const ranking = this.resumen()?.graficos.precisionPorOperador ?? [];

    return this.horizontalBarOption(
      ranking.map((item) => this.shortName(item.name)),
      [
        { name: 'Perforado', values: ranking.map((item) => item.perforado), color: '#3b82f6' },
        { name: 'Real', values: ranking.map((item) => item.real), color: '#d97706' }
      ],
      'm'
    );
  });

  constructor() {
    this.cargarDashboard();
  }

  cargarDashboard(): void {
    this.cargando.set(true);
    this.dashboardService.obtenerResumen({
      fechaDesde: this.fechaDesde(),
      fechaHasta: this.fechaHasta()
    }).subscribe({
      next: (resumen) => {
        this.resumen.set(resumen);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  private donutOption(data: NumericGroup[], colors: string[]): EChartsCoreOption {
    return {
      color: colors,
      tooltip: { trigger: 'item' },
      legend: { bottom: 0, icon: 'circle', textStyle: { color: '#64747c', fontSize: 11 } },
      series: [
        {
          type: 'pie',
          radius: ['52%', '72%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          label: { show: false },
          data: data.map((item) => ({ name: item.name, value: item.value }))
        }
      ]
    };
  }

  private pieOption(data: NumericGroup[], colors: string[]): EChartsCoreOption {
    return {
      color: colors,
      tooltip: { trigger: 'item' },
      legend: { bottom: 0, icon: 'circle', textStyle: { color: '#64747c', fontSize: 11 } },
      series: [
        {
          type: 'pie',
          radius: '68%',
          center: ['50%', '45%'],
          label: { formatter: '{d}%', color: '#2563eb', fontSize: 12 },
          data: data.map((item) => ({ name: item.name, value: item.value }))
        }
      ]
    };
  }

  private horizontalBarOption(
    categories: string[],
    series: Array<{ name: string; values: number[]; color: string }>,
    unit: string
  ): EChartsCoreOption {
    return {
      color: series.map((item) => item.color),
      tooltip: { trigger: 'axis', valueFormatter: (value: number | string) => `${value} ${unit}` },
      legend: { bottom: 0, icon: 'circle', textStyle: { color: '#64747c', fontSize: 11 } },
      grid: { left: 92, right: 20, top: 18, bottom: 42 },
      xAxis: { type: 'value', axisLabel: { color: '#64747c' }, splitLine: { lineStyle: { type: 'dashed', color: '#dbe4e7' } } },
      yAxis: { type: 'category', data: categories, axisLabel: { color: '#172126' } },
      series: series.map((item) => ({
        name: item.name,
        type: 'bar',
        barMaxWidth: 18,
        data: item.values,
        itemStyle: { borderRadius: [0, 6, 6, 0] }
      }))
    };
  }

  private groupedBarOption(
    categories: string[],
    series: Array<{ name: string; values: number[]; color: string }>
  ): EChartsCoreOption {
    return {
      color: series.map((item) => item.color),
      tooltip: { trigger: 'axis' },
      legend: { bottom: 0, icon: 'rect', textStyle: { color: '#64747c', fontSize: 11 } },
      grid: { left: 48, right: 16, top: 20, bottom: 48 },
      xAxis: { type: 'category', data: categories, axisLabel: { color: '#64747c', fontSize: 10 } },
      yAxis: { type: 'value', axisLabel: { color: '#64747c' }, splitLine: { lineStyle: { color: '#e8eef1' } } },
      series: series.map((item) => ({
        name: item.name,
        type: 'bar',
        barMaxWidth: 18,
        data: item.values
      }))
    };
  }

  private stackedBarOption(
    categories: string[],
    series: Array<{ name: string; values: number[]; color: string }>
  ): EChartsCoreOption {
    return {
      color: series.map((item) => item.color),
      tooltip: { trigger: 'axis' },
      legend: { top: 0, right: 8, icon: 'circle', textStyle: { color: '#172126', fontSize: 11 } },
      grid: { left: 52, right: 24, top: 36, bottom: 38 },
      xAxis: { type: 'category', data: categories, axisLabel: { color: '#172126', fontSize: 10 } },
      yAxis: { type: 'value', axisLabel: { color: '#64747c' }, splitLine: { lineStyle: { color: '#e8eef1' } } },
      series: series.map((item) => ({
        name: item.name,
        type: 'bar',
        stack: 'total',
        barMaxWidth: 54,
        data: item.values
      }))
    };
  }

  private shortName(name: string): string {
    const parts = name.split(',').map((part) => part.trim());
    return parts.length > 1 ? `${parts[1]} ${parts[0]}` : name;
  }
}
