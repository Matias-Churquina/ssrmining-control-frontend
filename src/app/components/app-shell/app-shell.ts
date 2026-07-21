import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SesionService } from '../../services/sesion.service';

interface NavigationItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss'
})
export class AppShell {
  private readonly router = inject(Router);
  private readonly sesion = inject(SesionService);

  readonly usuario = this.sesion.usuarioActual;
  readonly iniciales = computed(() => {
    const usuario = this.usuario();
    return usuario ? `${usuario.nombre[0]}${usuario.apellido[0]}`.toUpperCase() : 'SR';
  });

  readonly navigation: NavigationItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'bi-grid-1x2' },
    { label: 'Perforaciones', route: '/perforaciones', icon: 'bi-cone-striped' },
    { label: 'Revision', route: '/revision-supervisor', icon: 'bi-patch-check' },
    { label: 'Equipos', route: '/equipos', icon: 'bi-truck' },
    { label: 'Usuarios', route: '/usuarios', icon: 'bi-people' }
  ];

  cerrarSesion(): void {
    this.sesion.cerrarSesion();
    void this.router.navigate(['/login']);
  }
}
