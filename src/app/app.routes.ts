import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login)
  },
  {
    path: '',
    loadComponent: () => import('./components/app-shell/app-shell').then((m) => m.AppShell),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/inicio/inicio').then((m) => m.Inicio)
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        data: { roles: ['ADMINISTRADOR', 'SUPERVISOR'] },
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard)
      },
      {
        path: 'usuarios',
        canActivate: [authGuard],
        data: { roles: ['ADMINISTRADOR'] },
        loadComponent: () => import('./pages/usuarios/usuarios').then((m) => m.Usuarios)
      },
      {
        path: 'equipos',
        canActivate: [authGuard],
        data: { roles: ['ADMINISTRADOR'] },
        loadComponent: () => import('./pages/equipos/equipos').then((m) => m.Equipos)
      },
      {
        path: 'perforaciones',
        canActivate: [authGuard],
        data: { roles: ['ADMINISTRADOR', 'OPERADOR'] },
        loadComponent: () => import('./pages/perforaciones/perforaciones').then((m) => m.Perforaciones)
      },
      {
        path: 'revision-supervisor',
        canActivate: [authGuard],
        data: { roles: ['ADMINISTRADOR', 'SUPERVISOR', 'OPERADOR'] },
        loadComponent: () => import('./pages/revision-supervisor/revision-supervisor').then((m) => m.RevisionSupervisor)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
