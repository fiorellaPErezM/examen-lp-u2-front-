import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vuelo, Equipaje, Reserva } from '../models/vuelo.model';

@Injectable({
  providedIn: 'root',
})
export class VueloService {
  // <-- Asegúrate de que diga exactamente VueloService
  private http = inject(HttpClient);
  private baseUrl = 'https://vuelos-api.multicomp.pe/api';

  getVuelos(order?: 'numero' | 'fecha'): Observable<Vuelo[]> {
    let params = new HttpParams();
    if (order) params = params.set('order', order);
    return this.http.get<Vuelo[]>(`${this.baseUrl}/vuelos/`, { params });
  }

  getEquipajes(): Observable<Equipaje[]> {
    return this.http.get<Equipaje[]>(`${this.baseUrl}/equipajes/`);
  }

  crearReserva(payload: any): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.baseUrl}/reservas/`, payload);
  }

  buscarReserva(documento: string, numeroVuelo: string): Observable<Reserva> {
    const params = new HttpParams().set('documento', documento).set('numero_vuelo', numeroVuelo);
    return this.http.get<Reserva>(`${this.baseUrl}/reservas/buscar/`, { params });
  }
}
