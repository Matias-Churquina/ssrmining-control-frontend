import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-inicio',
  template: ''
})
export class Inicio {
  constructor() {
    const router = inject(Router);
    const sesion = inject(SesionService);

    void router.navigateByUrl(sesion.rutaInicial());
  }
}
