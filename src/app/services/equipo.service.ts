import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Equipo, EstadoEquipo } from '../models/equipo.model';

@Injectable({ providedIn: 'root' })
export class EquipoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/equipos`;

  listar(): Observable<Equipo[]> {
    return this.http.get<ApiResponse<Equipo[]>>(this.apiUrl).pipe(map((response) => response.data));
  }

  obtenerPorId(idEquipo: number): Observable<Equipo> {
    return this.http.get<ApiResponse<Equipo>>(`${this.apiUrl}/${idEquipo}`).pipe(map((response) => response.data));
  }

  crear(payload: Partial<Equipo>): Observable<Equipo> {
    return this.http.post<ApiResponse<Equipo>>(this.apiUrl, payload).pipe(map((response) => response.data));
  }

  actualizar(idEquipo: number, payload: Partial<Equipo>): Observable<Equipo> {
    return this.http.put<ApiResponse<Equipo>>(`${this.apiUrl}/${idEquipo}`, payload).pipe(map((response) => response.data));
  }

  cambiarEstado(idEquipo: number, estado: EstadoEquipo): Observable<Equipo> {
    return this.http.patch<ApiResponse<Equipo>>(`${this.apiUrl}/${idEquipo}/estado`, { estado }).pipe(map((response) => response.data));
  }
}
