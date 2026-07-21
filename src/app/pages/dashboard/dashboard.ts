import { Component, inject, signal } from '@angular/core';
import { MetricTile } from '../../components/metric-tile/metric-tile';
import { StatusCard } from '../../components/status-card/status-card';
import { DashboardResumen } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [MetricTile, StatusCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private readonly dashboardService = inject(DashboardService);

  readonly resumen = signal<DashboardResumen | null>(null);
  readonly cargando = signal(true);

  constructor() {
    this.dashboardService.obtenerResumen().subscribe({
      next: (resumen) => {
        this.resumen.set(resumen);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }
}
