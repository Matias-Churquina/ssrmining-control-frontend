import { Component, inject, signal } from '@angular/core';
import { Perforacion } from '../../models/perforacion.model';
import { PerforacionService } from '../../services/perforacion.service';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-revision-supervisor',
  templateUrl: './revision-supervisor.html',
  styleUrl: './revision-supervisor.scss'
})
export class RevisionSupervisor {
  private readonly perforacionService = inject(PerforacionService);
  private readonly sesion = inject(SesionService);

  readonly perforaciones = signal<Perforacion[]>([]);
  readonly esOperador = this.sesion.rolActual === 'OPERADOR';

  constructor() {
    const filtros = this.esOperador ? {} : { estado: 'PENDIENTE' };

    this.perforacionService.listar(filtros).subscribe({
      next: (perforaciones) => this.perforaciones.set(perforaciones),
      error: () => this.perforaciones.set([])
    });
  }
}
