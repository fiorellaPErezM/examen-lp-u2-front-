import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <-- Dejamos solo el outlet principal para limpiar las advertencias
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'vuelos-frontend';
}
