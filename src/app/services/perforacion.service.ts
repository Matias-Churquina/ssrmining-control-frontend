import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EstadoPerforacion, Perforacion } from '../models/perforacion.model';

@Injectable({ providedIn: 'root' })
export class PerforacionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/perforaciones`;

  listar(filtros: Record<string, string | number | undefined> = {}): Observable<Perforacion[]> {
    let params = new HttpParams();

    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<Perforacion[]>(this.apiUrl, { params });
  }

  obtenerPorId(idPerforacion: number): Observable<Perforacion> {
    return this.http.get<Perforacion>(`${this.apiUrl}/${idPerforacion}`);
  }

  crear(payload: Partial<Perforacion>): Observable<Perforacion> {
    return this.http.post<Perforacion>(this.apiUrl, payload);
  }

  actualizar(idPerforacion: number, payload: Partial<Perforacion>): Observable<Perforacion> {
    return this.http.put<Perforacion>(`${this.apiUrl}/${idPerforacion}`, payload);
  }

  revisar(idPerforacion: number, estado: EstadoPerforacion, motivoRechazo?: string): Observable<Perforacion> {
    return this.http.patch<Perforacion>(`${this.apiUrl}/${idPerforacion}/revision`, { estado, motivoRechazo });
  }
}
