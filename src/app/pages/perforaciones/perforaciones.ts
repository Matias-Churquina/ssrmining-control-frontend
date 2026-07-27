import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Equipo } from '../../models/equipo.model';
import { Perforacion } from '../../models/perforacion.model';
import { EquipoService } from '../../services/equipo.service';
import { PerforacionService } from '../../services/perforacion.service';

@Component({
  selector: 'app-perforaciones',
  imports: [ReactiveFormsModule],
  templateUrl: './perforaciones.html',
  styleUrl: './perforaciones.scss'
})
export class Perforaciones {
  private readonly fb = inject(FormBuilder);
  private readonly equipoService = inject(EquipoService);
  private readonly perforacionService = inject(PerforacionService);

  readonly perforaciones = signal<Perforacion[]>([]);
  readonly equiposActivos = signal<Equipo[]>([]);
  readonly mostrarFormulario = signal(false);
  readonly guardando = signal(false);
  readonly mensaje = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    codigoPerforacion: [''],
    fecha: [new Date().toISOString().slice(0, 10), Validators.required],
    fase: ['Fase 8', [Validators.required, Validators.minLength(3)]],
    banco: [4110, [Validators.required, Validators.min(2500), Validators.max(5000)]],
    malla: ['M-01', Validators.required],
    idPozo: ['', Validators.required],
    tipoRoca: ['Toba blanda', [Validators.required, Validators.minLength(3)]],
    profundidadDiseno: [10, [Validators.required, Validators.min(1)]],
    metrosPerforados: [10, [Validators.required, Validators.min(1)]],
    profundidadReal: [10, [Validators.required, Validators.min(1)]],
    horaInicio: ['08:00', Validators.required],
    horaFin: ['08:30', Validators.required],
    tipoPozo: ['Produccion', [Validators.required, Validators.minLength(3)]],
    observaciones: [''],
    idEquipo: [0, [Validators.required, Validators.min(1)]]
  });

  constructor() {
    this.cargarDatos();
  }

  toggleFormulario(): void {
    this.mostrarFormulario.update((value) => !value);
    this.mensaje.set(null);
    this.error.set(null);
  }

  crearPerforacion(): void {
    if (this.form.invalid || this.guardando()) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload = {
      ...raw,
      codigoPerforacion: raw.codigoPerforacion || undefined,
      observaciones: raw.observaciones || undefined,
      banco: Number(raw.banco),
      profundidadDiseno: Number(raw.profundidadDiseno),
      metrosPerforados: Number(raw.metrosPerforados),
      profundidadReal: Number(raw.profundidadReal),
      idEquipo: Number(raw.idEquipo)
    };

    this.guardando.set(true);
    this.mensaje.set(null);
    this.error.set(null);

    this.perforacionService.crear(payload).subscribe({
      next: () => {
        this.form.reset({
          codigoPerforacion: '',
          fecha: new Date().toISOString().slice(0, 10),
          fase: 'Fase 8',
          banco: 4110,
          malla: 'M-01',
          idPozo: '',
          tipoRoca: 'Toba blanda',
          profundidadDiseno: 10,
          metrosPerforados: 10,
          profundidadReal: 10,
          horaInicio: '08:00',
          horaFin: '08:30',
          tipoPozo: 'Produccion',
          observaciones: '',
          idEquipo: 0
        });
        this.mensaje.set('Perforacion registrada correctamente y enviada a revision.');
        this.mostrarFormulario.set(false);
        this.guardando.set(false);
        this.cargarPerforaciones();
      },
      error: () => {
        this.error.set('No se pudo registrar la perforacion. Revisa equipo, profundidades y datos obligatorios.');
        this.guardando.set(false);
      }
    });
  }

  private cargarDatos(): void {
    this.equipoService.listar().subscribe({
      next: (equipos) => this.equiposActivos.set(equipos.filter((equipo) => equipo.estado === 'ACTIVO')),
      error: () => this.equiposActivos.set([])
    });
    this.cargarPerforaciones();
  }

  private cargarPerforaciones(): void {
    this.perforacionService.listar().subscribe({
      next: (perforaciones) => this.perforaciones.set(perforaciones),
      error: () => this.perforaciones.set([])
    });
  }
}
