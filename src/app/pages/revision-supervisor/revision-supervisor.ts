import { Component, inject, signal } from '@angular/core';
import { Perforacion } from '../../models/perforacion.model';
import { PerforacionService } from '../../services/perforacion.service';

@Component({
  selector: 'app-revision-supervisor',
  templateUrl: './revision-supervisor.html',
  styleUrl: './revision-supervisor.scss'
})
export class RevisionSupervisor {
  private readonly perforacionService = inject(PerforacionService);

  readonly pendientes = signal<Perforacion[]>([]);

  constructor() {
    this.perforacionService.listar({ estado: 'PENDIENTE' }).subscribe({
      next: (perforaciones) => this.pendientes.set(perforaciones),
      error: () => this.pendientes.set([])
    });
  }
}
