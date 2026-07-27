import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);
  readonly mostrarPassword = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  togglePassword(): void {
    this.mostrarPassword.update((value) => !value);
  }

  ingresar(): void {
    if (this.form.invalid || this.cargando()) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    this.error.set(null);

    this.authService.login(this.form.getRawValue()).subscribe({
      next: (response) => {
        const rol = response.usuario.rol;
        const route = rol === 'OPERADOR'
          ? '/perforaciones'
          : rol === 'SUPERVISOR'
            ? '/revision-supervisor'
            : '/dashboard';

        void this.router.navigate([route]);
      },
      error: () => {
        this.error.set('No se pudo iniciar sesion. Verifica email y contrasena.');
        this.cargando.set(false);
      }
    });
  }
}
