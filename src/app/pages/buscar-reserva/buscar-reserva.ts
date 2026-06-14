import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VueloService } from '../../services/vuelo'; // <-- Apunta directo a tu archivo vuelo.ts
import { Reserva } from '../../models/vuelo.model';

@Component({
  selector: 'app-buscar-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-reserva.html',
  styleUrl: './buscar-reserva.css',
})
export class BuscarReserva {
  private vueloService = inject(VueloService);

  // Campos del formulario reactivos con Signals
  documento = signal<string>('');
  numeroVuelo = signal<string>('');

  // Resultados de la búsqueda
  reservaEncontrada = signal<Reserva | null>(null);
  diasRestantes = signal<number | null>(null);
  mensajeError = signal<string>('');

  buscar() {
    this.reservaEncontrada.set(null);
    this.diasRestantes.set(null);
    this.mensajeError.set('');

    if (!this.documento() || !this.numeroVuelo()) {
      this.mensajeError.set('Por favor, complete ambos campos.');
      return;
    }

    this.vueloService.buscarReserva(this.documento(), this.numeroVuelo()).subscribe({
      next: (reserva: any) => {
        this.reservaEncontrada.set(reserva);
        this.calcularDias(reserva.vuelo.fecha_salida);
      },
      error: (err: any) => {
        if (err.status === 404) {
          this.mensajeError.set('No se encontró ninguna reserva con los datos ingresados.');
        } else {
          this.mensajeError.set('Ocurrió un error al conectar con el servidor.');
        }
      },
    });
  }

  calcularDias(fechaSalidaStr: string) {
    const fechaSalida = new Date(fechaSalidaStr);
    const fechaActual = new Date();

    fechaSalida.setHours(0, 0, 0, 0);
    fechaActual.setHours(0, 0, 0, 0);

    const diferenciaTiempo = fechaSalida.getTime() - fechaActual.getTime();
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

    this.diasRestantes.set(diferenciaDias);
  }
}
