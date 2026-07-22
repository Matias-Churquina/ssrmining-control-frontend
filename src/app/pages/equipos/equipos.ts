import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Equipo } from '../../models/equipo.model';
import { EquipoService } from '../../services/equipo.service';

@Component({
  selector: 'app-equipos',
  imports: [ReactiveFormsModule],
  templateUrl: './equipos.html',
  styleUrl: './equipos.scss'
})
export class Equipos {
  private readonly fb = inject(FormBuilder);
  private readonly equipoService = inject(EquipoService);

  readonly equipos = signal<Equipo[]>([]);
  readonly mostrarFormulario = signal(false);
  readonly guardando = signal(false);
  readonly mensaje = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    codigo: ['', Validators.required],
    descripcion: ['', [Validators.required, Validators.maxLength(150)]],
    modelo: ['', Validators.required],
    estado: ['ACTIVO' as const, Validators.required]
  });

  constructor() {
    this.cargarEquipos();
  }

  toggleFormulario(): void {
    this.mostrarFormulario.update((value) => !value);
    this.mensaje.set(null);
    this.error.set(null);
  }

  crearEquipo(): void {
    if (this.form.invalid || this.guardando()) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    this.mensaje.set(null);
    this.error.set(null);

    this.equipoService.crear(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset({ codigo: '', descripcion: '', modelo: '', estado: 'ACTIVO' });
        this.mensaje.set('Equipo creado correctamente.');
        this.mostrarFormulario.set(false);
        this.guardando.set(false);
        this.cargarEquipos();
      },
      error: () => {
        this.error.set('No se pudo crear el equipo. Verifica codigo duplicado o datos invalidos.');
        this.guardando.set(false);
      }
    });
  }

  private cargarEquipos(): void {
    this.equipoService.listar().subscribe({
      next: (equipos) => this.equipos.set(equipos),
      error: () => this.equipos.set([])
    });
  }
}
