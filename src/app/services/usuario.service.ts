import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Rol, Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<ApiResponse<Usuario[]>>(`${this.apiUrl}/usuarios`).pipe(map((response) => response.data));
  }

  crearUsuario(payload: Partial<Usuario> & { password?: string }): Observable<Usuario> {
    return this.http.post<ApiResponse<Usuario>>(`${this.apiUrl}/usuarios`, payload).pipe(map((response) => response.data));
  }

  actualizarUsuario(idUsuario: number, payload: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<ApiResponse<Usuario>>(`${this.apiUrl}/usuarios/${idUsuario}`, payload).pipe(map((response) => response.data));
  }

  listarRoles(): Observable<Rol[]> {
    return this.http.get<ApiResponse<Rol[]>>(`${this.apiUrl}/roles`).pipe(map((response) => response.data));
  }
}
