import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SesionService } from '../../services/sesion.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(SesionService).token;

  if (!token) {
    return next(request);
  }

  return next(request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }));
};
