import { Component, inject, signal } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios {
  private readonly usuarioService = inject(UsuarioService);

  readonly usuarios = signal<Usuario[]>([]);

  constructor() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => this.usuarios.set(usuarios),
      error: () => this.usuarios.set([])
    });
  }
}
