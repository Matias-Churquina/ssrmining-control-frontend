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
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/usuarios/usuarios').then((m) => m.Usuarios)
      },
      {
        path: 'equipos',
        loadComponent: () => import('./pages/equipos/equipos').then((m) => m.Equipos)
      },
      {
        path: 'perforaciones',
        loadComponent: () => import('./pages/perforaciones/perforaciones').then((m) => m.Perforaciones)
      },
      {
        path: 'revision-supervisor',
        loadComponent: () => import('./pages/revision-supervisor/revision-supervisor').then((m) => m.RevisionSupervisor)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
