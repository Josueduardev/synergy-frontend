import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FiltrosButtonComponent } from './filtros-button/filtros-button.component';
import { DesembolsarButtonComponent } from './desembolsar-button/desembolsar-button.component';
import { ModalFiltrosAvanzadosComponent } from './modal-filtros-avanzados/modal-filtros-avanzados.component';
import { MessageService } from 'primeng/api';

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
  placeholder: string = 'Desde - Hasta'; // Texto del placeholder
  mostrarModalFiltros: boolean = false; // Controla la visibilidad del modal

  @ViewChild('calendar') calendar!: Calendar;

  @Output() filtersChanges = new EventEmitter<any>();

  constructor(private messageService: MessageService){}

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
    this.closeCalendar()
  }

  aplicarSeleccion() {
    if (this.rangeDates && this.rangeDates[0] && this.rangeDates[1]) {
      //this.calendar.hideOnDateTimeSelect=true;
      // Formatear las fechas al formato YYYY-MM-DD
      const fechasFormateadas = this.rangeDates.map(fecha => {
        return fecha.toISOString().split('T')[0]; // Extraer solo la parte de la fecha (YYYY-MM-DD)
      });

      this.filtersChanges.emit({fecha_inicio: fechasFormateadas[0], fecha_fin: fechasFormateadas[1]})
    } else {
      console.log('No se ha seleccionado un rango de fechas.');
      this.messageService.add({ severity: 'warning', summary: 'Seleccionar Fechas', detail: 'No se ha seleccionado un rango de fechas.' });
    }
    this.closeCalendar()
    //this.calendar.hideOnDateTimeSelect=false;
  }

  closeCalendar(): void {
    if (this.calendar) {
      this.calendar.hideOverlay(); // Hides the calendar overlay
      console.log('Calendar overlay closed.');
    }
  }

  buscar() {
    console.log('Buscando:', this.searchText);
  }

  mostrarModal() {
    this.mostrarModalFiltros = true; // Muestra el modal
  }

  cerrarModal(filtros?: any) {
    this.mostrarModalFiltros = false; // Cierra el modal

    if (filtros) {
      console.log('Filtros recibidos del modal:', filtros);
      this.filtersChanges.emit(filtros); // Emite los filtros al componente padre
    }
  }
}
