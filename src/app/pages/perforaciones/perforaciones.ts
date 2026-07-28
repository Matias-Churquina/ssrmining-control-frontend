import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipoOption } from '../../models/equipo.model';
import { Perforacion } from '../../models/perforacion.model';
import { NotificationService } from '../../core/notifications/notification.service';
import { EquipoService } from '../../services/equipo.service';
import { PerforacionService } from '../../services/perforacion.service';
import { SesionService } from '../../services/sesion.service';

const CONTEXT_KEY = 'ssrmining_perforacion_context';

type PerforacionContext = {
  fecha: string;
  idEquipo: number;
  fase: string;
  banco: number;
  malla: string;
  idPozo: string;
  tipoRoca: string;
};

@Component({
  selector: 'app-perforaciones',
  imports: [ReactiveFormsModule],
  templateUrl: './perforaciones.html',
  styleUrl: './perforaciones.scss'
})
export class Perforaciones {
  private readonly fb = inject(FormBuilder);
  private readonly equipoService = inject(EquipoService);
  private readonly notifications = inject(NotificationService);
  private readonly perforacionService = inject(PerforacionService);
  private readonly sesion = inject(SesionService);
  private persistenciaPausada = false;

  readonly usuario = this.sesion.usuarioActual;
  readonly perforaciones = signal<Perforacion[]>([]);
  readonly equiposActivos = signal<EquipoOption[]>([]);
  readonly mostrarFormulario = signal(true);
  readonly guardando = signal(false);

  readonly equipoSeleccionado = computed(() =>
    this.equiposActivos().find((equipo) => equipo.idEquipo === Number(this.form.controls.idEquipo.value))
  );

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
    this.restaurarContexto();
    this.cargarDatos();

    this.form.valueChanges.subscribe(() => this.guardarContexto());
  }

  toggleFormulario(): void {
    this.mostrarFormulario.update((value) => !value);
  }

  limpiarContexto(): void {
    this.persistenciaPausada = true;
    localStorage.removeItem(CONTEXT_KEY);
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
    this.persistenciaPausada = false;
    this.notifications.info('Contexto de fase reiniciado.');
  }

  crearPerforacion(): void {
    if (this.form.invalid || this.guardando()) {
      this.form.markAllAsTouched();
      this.notifications.warning('Completa los campos requeridos antes de guardar.');
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

    this.perforacionService.crear(payload).subscribe({
      next: () => {
        this.notifications.success('Pozo guardado. El contexto de fase se mantiene activo.');
        this.guardando.set(false);
        this.limpiarRegistroPozo();
        this.cargarPerforaciones();
      },
      error: () => {
        this.notifications.error('No se pudo registrar la perforacion. Revisa equipo, profundidades y datos obligatorios.');
        this.guardando.set(false);
      }
    });
  }

  private cargarDatos(): void {
    this.equipoService.listarOpciones().subscribe({
      next: (equipos) => this.equiposActivos.set(equipos),
      error: () => {
        this.equiposActivos.set([]);
        this.notifications.error('No se pudieron cargar las opciones de equipos.');
      }
    });
    this.cargarPerforaciones();
  }

  private cargarPerforaciones(): void {
    this.perforacionService.listar().subscribe({
      next: (perforaciones) => this.perforaciones.set(perforaciones),
      error: () => this.perforaciones.set([])
    });
  }

  private limpiarRegistroPozo(): void {
    this.form.patchValue({
      codigoPerforacion: '',
      profundidadDiseno: 10,
      metrosPerforados: 10,
      profundidadReal: 10,
      horaInicio: '08:00',
      horaFin: '08:30',
      tipoPozo: 'Produccion',
      observaciones: ''
    });
  }

  private guardarContexto(): void {
    if (this.persistenciaPausada) {
      return;
    }

    const raw = this.form.getRawValue();
    const context: PerforacionContext = {
      fecha: raw.fecha,
      idEquipo: Number(raw.idEquipo),
      fase: raw.fase,
      banco: Number(raw.banco),
      malla: raw.malla,
      idPozo: raw.idPozo,
      tipoRoca: raw.tipoRoca
    };

    localStorage.setItem(CONTEXT_KEY, JSON.stringify(context));
  }

  private restaurarContexto(): void {
    const rawContext = localStorage.getItem(CONTEXT_KEY);

    if (!rawContext) {
      return;
    }

    const context = JSON.parse(rawContext) as PerforacionContext;
    this.form.patchValue(context);
  }
}
