import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FiltrosButtonComponent } from './filtros-button/filtros-button.component';
import { DesembolsarButtonComponent } from './desembolsar-button/desembolsar-button.component';
import { ModalFiltrosAvanzadosComponent } from './modal-filtros-avanzados/modal-filtros-avanzados.component';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    FiltrosButtonComponent,
    DesembolsarButtonComponent,
    ModalFiltrosAvanzadosComponent,
  ],
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent {
  searchText: string = ''; // Texto del input de búsqueda
  rangeDates: Date[] | null = null; // Rango de fechas seleccionado
  placeholder: string = 'Seleccionar rango de fechas'; // Texto del placeholder
  mostrarModalFiltros: boolean = false; // Controla la visibilidad del modal

  actualizarRangoTexto() {
    if (this.rangeDates && this.rangeDates[0] && this.rangeDates[1]) {
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
      const formatter = new Intl.DateTimeFormat('es-ES', options);
      this.placeholder = `${formatter.format(this.rangeDates[0])} - ${formatter.format(this.rangeDates[1])}`;
    } else {
      this.placeholder = 'Seleccionar rango de fechas';
    }
  }

  clearRangoTexto() {
    this.rangeDates = null;
    this.placeholder = 'Seleccionar rango de fechas';
  }

  aplicarSeleccion() {
    console.log('Rango de fechas seleccionado:', this.placeholder);
  }

  buscar() {
    console.log('Buscando:', this.searchText);
  }

  mostrarModal() {
    this.mostrarModalFiltros = true; // Muestra el modal
  }

  cerrarModal() {
    this.mostrarModalFiltros = false; // Cierra el modal
  }
}
