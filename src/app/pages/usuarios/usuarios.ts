import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Rol, Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios {
  private readonly fb = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);

  readonly usuarios = signal<Usuario[]>([]);
  readonly roles = signal<Rol[]>([]);
  readonly mostrarFormulario = signal(false);
  readonly guardando = signal(false);
  readonly mensaje = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    idRol: [0, [Validators.required, Validators.min(1)]],
    legajo: ['', [Validators.required, Validators.minLength(2)]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor() {
    this.cargarDatos();
  }

  toggleFormulario(): void {
    this.mostrarFormulario.update((value) => !value);
    this.mensaje.set(null);
    this.error.set(null);
  }

  crearUsuario(): void {
    if (this.form.invalid || this.guardando()) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    this.mensaje.set(null);
    this.error.set(null);

    this.usuarioService.crearUsuario(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
        this.mensaje.set('Usuario creado correctamente.');
        this.mostrarFormulario.set(false);
        this.guardando.set(false);
        this.cargarUsuarios();
      },
      error: () => {
        this.error.set('No se pudo crear el usuario. Verifica datos duplicados o campos invalidos.');
        this.guardando.set(false);
      }
    });
  }

  private cargarDatos(): void {
    this.usuarioService.listarRoles().subscribe({
      next: (roles) => this.roles.set(roles.filter((rol) => rol.activo)),
      error: () => this.roles.set([])
    });
    this.cargarUsuarios();
  }

  private cargarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => this.usuarios.set(usuarios),
      error: () => this.usuarios.set([])
    });
  }
}
