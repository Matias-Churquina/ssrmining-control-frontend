import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
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

    return this.http.get<ApiResponse<Perforacion[]>>(this.apiUrl, { params }).pipe(map((response) => response.data));
  }

  obtenerPorId(idPerforacion: number): Observable<Perforacion> {
    return this.http.get<ApiResponse<Perforacion>>(`${this.apiUrl}/${idPerforacion}`).pipe(map((response) => response.data));
  }

  crear(payload: Partial<Perforacion>): Observable<Perforacion> {
    return this.http.post<ApiResponse<Perforacion>>(this.apiUrl, payload).pipe(map((response) => response.data));
  }

  actualizar(idPerforacion: number, payload: Partial<Perforacion>): Observable<Perforacion> {
    return this.http.put<ApiResponse<Perforacion>>(`${this.apiUrl}/${idPerforacion}`, payload).pipe(map((response) => response.data));
  }

  revisar(idPerforacion: number, estado: EstadoPerforacion, motivoRechazo?: string): Observable<Perforacion> {
    return this.http.delete<ApiResponse<Perforacion>>(`${this.apiUrl}/${idPerforacion}`, {
      body: { motivoRechazo: motivoRechazo ?? `Revision marcada como ${estado}` }
    }).pipe(map((response) => response.data));
  }
}
