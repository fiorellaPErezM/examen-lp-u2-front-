import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VueloService } from '../../services/vuelo'; // <-- Cambiado a tu archivo real vuelo.ts
import { Vuelo, Equipaje, Reserva, Pasajero } from '../../models/vuelo.model';

@Component({
  selector: 'app-proceso-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proceso-reserva.html',
  styleUrl: './proceso-reserva.css',
})
export class ProcesoReserva implements OnInit {
  private vueloService = inject(VueloService);

  vuelos = signal<Vuelo[]>([]);
  equipajes = signal<any[]>([]);
  vueloSeleccionado = signal<Vuelo | null>(null);
  cantidadPasajeros = signal<number>(1);
  pasajerosForm = signal<any[]>([]);
  boletaOficial = signal<Reserva | null>(null);

  ngOnInit() {
    this.cargarVuelos();
    this.vueloService.getEquipajes().subscribe({
      next: (data: any) => this.equipajes.set(data),
      error: () => console.error('Error al cargar equipajes'),
    });
  }

  cargarVuelos(order?: 'numero' | 'fecha') {
    this.vueloService.getVuelos(order).subscribe({
      next: (data: any) => this.vuelos.set(data),
      error: () => console.error('Error al cargar vuelos'),
    });
  }

  seleccionarVuelo(vuelo: Vuelo) {
    this.vueloSeleccionado.set(vuelo);
    this.boletaOficial.set(null);
    this.actualizarEstructuraPasajeros();
  }

  cambiarPasajeros(event: any) {
    const target = event.target as HTMLInputElement;
    const cant = Math.max(1, parseInt(target.value) || 1);
    this.cantidadPasajeros.set(cant);
    this.actualizarEstructuraPasajeros();
  }

  actualizarEstructuraPasajeros() {
    const cant = this.cantidadPasajeros();
    const actuales = [...this.pasajerosForm()];

    if (actuales.length < cant) {
      for (let i = actuales.length; i < cant; i++) {
        actuales.push({
          nombre: '',
          documento: '',
          equipaje: [{ equipaje: 0, cantidad: 1 }],
        });
      }
    } else if (actuales.length > cant) {
      actuales.splice(cant);
    }
    this.pasajerosForm.set(actuales);
  }

  totalCotizado = computed(() => {
    const vuelo = this.vueloSeleccionado();
    if (!vuelo) return 0;

    const precioVuelo = parseFloat(vuelo.precio);
    const totalVuelos = precioVuelo * this.cantidadPasajeros();

    let totalEquipaje = 0;
    const listaEquipajes = this.equipajes();

    this.pasajerosForm().forEach((p: any) => {
      if (p.equipaje) {
        p.equipaje.forEach((e: any) => {
          const idEquipajeSeleccionado = Number(e.equipaje);
          const eqEncontrado = listaEquipajes.find(
            (item: any) => item.id === idEquipajeSeleccionado,
          );
          if (eqEncontrado) {
            totalEquipaje += parseFloat(eqEncontrado.costo) * e.cantidad;
          }
        });
      }
    });

    return totalVuelos + totalEquipaje;
  });

  confirmarReserva() {
    const vuelo = this.vueloSeleccionado();
    if (!vuelo) return;

    const pasajerosPayload = this.pasajerosForm().map((p: any) => {
      const equipajesFiltrados = p.equipaje
        .filter((e: any) => Number(e.equipaje) > 0)
        .map((e: any) => ({
          equipaje: Number(e.equipaje),
          cantidad: e.cantidad,
        }));

      return {
        nombre: p.nombre,
        documento: p.documento,
        equipaje: equipajesFiltrados,
      };
    });

    const payload = {
      vuelo: vuelo.id,
      pasajeros: pasajerosPayload,
    };

    this.vueloService.crearReserva(payload).subscribe({
      next: (reservaCreada: any) => {
        this.boletaOficial.set(reservaCreada);
        this.vueloSeleccionado.set(null);
      },
      error: () => alert('Error al procesar la reserva con el servidor'),
    });
  }
}
