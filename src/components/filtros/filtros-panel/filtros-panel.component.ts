import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-filtros-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './filtros-panel.component.html',
  styleUrls: ['./filtros-panel.component.scss']
})
export class FiltrosPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  rangeDates: Date[] | null = null; // Rango de fechas seleccionado
  placeholder: string = 'Desde - Hasta'; // Texto del placeholder

  @Output() filtersChanges = new EventEmitter<any>();

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


}
