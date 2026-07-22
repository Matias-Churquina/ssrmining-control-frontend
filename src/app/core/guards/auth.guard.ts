import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../../models/auth.model';
import { SesionService } from '../../services/sesion.service';

export const authGuard: CanActivateFn = (route) => {
  const sesion = inject(SesionService);
  const router = inject(Router);

  if (!sesion.estaAutenticado) {
    return router.createUrlTree(['/login']);
  }

  const roles = route.data['roles'] as UserRole[] | undefined;

  if (!roles || sesion.puedeAcceder(roles)) {
    return true;
  }

  return router.createUrlTree([sesion.rutaInicial()]);
};
