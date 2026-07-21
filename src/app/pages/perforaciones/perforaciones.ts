import { Component, inject, signal } from '@angular/core';
import { Perforacion } from '../../models/perforacion.model';
import { PerforacionService } from '../../services/perforacion.service';

@Component({
  selector: 'app-perforaciones',
  templateUrl: './perforaciones.html',
  styleUrl: './perforaciones.scss'
})
export class Perforaciones {
  private readonly perforacionService = inject(PerforacionService);

  readonly perforaciones = signal<Perforacion[]>([]);

  constructor() {
    this.perforacionService.listar().subscribe({
      next: (perforaciones) => this.perforaciones.set(perforaciones),
      error: () => this.perforaciones.set([])
    });
  }
}
