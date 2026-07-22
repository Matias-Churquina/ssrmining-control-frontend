import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserRole } from '../../models/auth.model';
import { SesionService } from '../../services/sesion.service';

interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  roles: UserRole[];
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

  private readonly allNavigation: NavigationItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'bi-grid-1x2', roles: ['ADMINISTRADOR', 'SUPERVISOR'] },
    { label: 'Perforaciones', route: '/perforaciones', icon: 'bi-cone-striped', roles: ['ADMINISTRADOR', 'OPERADOR'] },
    { label: 'Revision', route: '/revision-supervisor', icon: 'bi-patch-check', roles: ['ADMINISTRADOR', 'SUPERVISOR'] },
    { label: 'Mi historial', route: '/revision-supervisor', icon: 'bi-clock-history', roles: ['OPERADOR'] },
    { label: 'Equipos', route: '/equipos', icon: 'bi-truck', roles: ['ADMINISTRADOR'] },
    { label: 'Usuarios', route: '/usuarios', icon: 'bi-people', roles: ['ADMINISTRADOR'] }
  ];

  readonly navigation = computed(() => {
    const rol = this.usuario()?.rol as UserRole | undefined;
    return this.allNavigation.filter((item) => rol && item.roles.includes(rol));
  });

  cerrarSesion(): void {
    this.sesion.cerrarSesion();
    void this.router.navigate(['/login']);
  }
}
