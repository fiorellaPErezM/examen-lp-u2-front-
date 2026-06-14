import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reserva',
    pathMatch: 'full',
  },
  {
    path: 'reserva',
    loadComponent: () =>
      import('./pages/proceso-reserva/proceso-reserva').then((m) => m.ProcesoReserva),
  },
  {
    path: 'buscar',
    loadComponent: () =>
      import('./pages/buscar-reserva/buscar-reserva').then((m) => m.BuscarReserva),
  },
];
