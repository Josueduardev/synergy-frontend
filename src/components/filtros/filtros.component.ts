import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, ButtonModule, InputTextModule],
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent {
  searchText: string = ''; // Texto de búsqueda
  rangoFechas: Date[] = []; // Rango de fechas

  filtrarPorRango() {
    if (this.rangoFechas.length === 2) {
      const [fechaInicio, fechaFin] = this.rangoFechas;
      console.log(
        `Filtrando desde ${fechaInicio.toLocaleDateString('es-ES')} hasta ${fechaFin.toLocaleDateString('es-ES')}`
      );
    } else {
      console.log('Selecciona un rango de fechas válido.');
    }
  }

  desembolsar() {
    console.log('Acción de desembolsar ejecutada.');
  }

  buscar() {
    console.log(`Buscando: ${this.searchText}`);
  }
}
