export interface Vuelo {
  id: number;
  numero: string;
  origen: string;
  destino: string;
  fecha_salida: string;
  fecha_llegada: string;
  precio: string;
}

export interface Equipaje {
  id: number;
  tamano: string;
  costo: string;
}

export interface EquipajeReserva {
  id?: number;
  equipaje: number | Equipaje;
  cantidad: number;
  subtotal?: string;
}

export interface Pasajero {
  id?: number;
  nombre: string;
  documento: string;
  equipaje: EquipajeReserva[];
}

export interface Reserva {
  id: number;
  vuelo: Vuelo;
  total: string;
  creado: string;
  pasajeros: Pasajero[];
}
