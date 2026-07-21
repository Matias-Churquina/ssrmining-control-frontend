import { Component, inject, signal } from '@angular/core';
import { Equipo } from '../../models/equipo.model';
import { EquipoService } from '../../services/equipo.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.html',
  styleUrl: './equipos.scss'
})
export class Equipos {
  private readonly equipoService = inject(EquipoService);

  readonly equipos = signal<Equipo[]>([]);

  constructor() {
    this.equipoService.listar().subscribe({
      next: (equipos) => this.equipos.set(equipos),
      error: () => this.equipos.set([])
    });
  }
}
