import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Equipo, EstadoEquipo } from '../models/equipo.model';

@Injectable({ providedIn: 'root' })
export class EquipoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/equipos`;

  listar(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl);
  }

  obtenerPorId(idEquipo: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.apiUrl}/${idEquipo}`);
  }

  crear(payload: Partial<Equipo>): Observable<Equipo> {
    return this.http.post<Equipo>(this.apiUrl, payload);
  }

  actualizar(idEquipo: number, payload: Partial<Equipo>): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.apiUrl}/${idEquipo}`, payload);
  }

  cambiarEstado(idEquipo: number, estado: EstadoEquipo): Observable<Equipo> {
    return this.http.patch<Equipo>(`${this.apiUrl}/${idEquipo}/estado`, { estado });
  }
}
