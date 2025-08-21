import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FiltrosButtonComponent } from '../filtros-button/filtros-button.component';
import { ModalFiltrosAvanzadosDesembolsosComponent } from './modal-filtros-avanzados-desembolsos.component';
import { SynergyProvider } from '../../../providers/synergy.provider';
import { ProcesarButtonComponent } from "../procesar-button/procesar-button.component";
import { CompletarButtonComponent } from "../completar-button/completar-button.component";
import { DesembolsarButtonComponent } from "../desembolsar-button/desembolsar-button.component";

@Component({
  selector: 'app-filtros-desembolso',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    FiltrosButtonComponent,
    ModalFiltrosAvanzadosDesembolsosComponent,
    ProcesarButtonComponent,
    CompletarButtonComponent,
    DesembolsarButtonComponent
],
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosDesembolsoComponent {
  searchText: string = ''; // Texto del input de búsqueda
  rangeDates: Date[] | null = null; // Rango de fechas seleccionado
  placeholder: string = 'Desde - Hasta'; // Texto del placeholder
  mostrarModalFiltros: boolean = false; // Controla la visibilidad del modal

  mostrarBotonDesembolsar: boolean = true;
  mostrarBotonProcesar: boolean = false;
  mostrarBotonDescargar: boolean = false;
  mostrarBotonCompletar: boolean = false;
  @Input() onlySearch = false

  filtros: any = {}; // Filtros que serán aplicados

  @ViewChild('calendar') calendar!: Calendar;

  @Output() filtersChanges = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private messageService: MessageService, private synergyProvider: SynergyProvider) {
    // Llamamos al método que determina el filtro según la ruta
    this.applyRouteFilter();

  }

  // Método para aplicar filtro basado en la ruta actual
  applyRouteFilter() {
    if (this.route.snapshot.routeConfig?.path) {
      console.log('Ruta actual:', this.route.snapshot.routeConfig?.path);
      this.typeRoute(this.route.snapshot.routeConfig.path);

    }
  }

  // Método que asigna los filtros según la ruta
  typeRoute(tipo: string) {
    // Solicitudes aprobadas
    if (tipo === 'aprobadas') {
      this.filtros = { estado: 2 };
      this.mostrarBotonDesembolsar = false;
      this.mostrarBotonProcesar = false;
      this.mostrarBotonCompletar = false;
      // Solicitudes denegadas
    } else if (tipo === 'denegadas') {
      this.filtros = { estado: 3 };
      this.mostrarBotonDesembolsar = false;
      this.mostrarBotonProcesar = false;
      this.mostrarBotonCompletar = false;
      // Desemsolbosos proesados
    } else if (tipo === 'procesadas') {
      this.filtros = { estado: 7 };
      this.mostrarBotonDescargar = false;
      this.mostrarBotonCompletar = true;
      this.mostrarBotonDesembolsar = false;
      this.mostrarBotonProcesar = false;
    }
    else if (tipo === 'pagados') {
      this.filtros = { estado: 8 };
      this.mostrarBotonDescargar = false;
      this.mostrarBotonDesembolsar = false;
      this.mostrarBotonProcesar = false;
      this.mostrarBotonCompletar = false;
    }
    // Desembolsos sin procesar
    else if (tipo === 'sin-procesar') {
      this.filtros = { estado: 5 };
      this.mostrarBotonProcesar = true;
      this.mostrarBotonCompletar = false;
    }
    // Este es de solicitudes sin procesar.
    else {
      this.filtros = { estado: 1 };
      this.mostrarBotonDesembolsar = false;
      this.mostrarBotonProcesar = false;
    }
    console.log("Botón de desembolsar:", this.mostrarBotonDesembolsar);
    this.loadSolicitudes();
  }



  // Cargar solicitudes según los filtros
  loadSolicitudes() {
    console.log('Filtros aplicados:', this.filtros);
    // Aquí podrías hacer una llamada HTTP para obtener las solicitudes filtradas
    this.filtersChanges.emit(this.filtros); // Emitir los filtros al componente padre
  }

  // Actualizar el texto del rango de fechas
  actualizarRangoTexto() {
    if (this.rangeDates && this.rangeDates[0] && this.rangeDates[1]) {
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
      const formatter = new Intl.DateTimeFormat('es-ES', options);
      this.placeholder = `${formatter.format(this.rangeDates[0])} - ${formatter.format(this.rangeDates[1])}`;
    } else {
      this.placeholder = 'Seleccionar rango de fechas';
    }
  }

  // Limpiar el rango de fechas
  clearRangoTexto() {
    this.rangeDates = null;
    this.placeholder = 'Seleccionar rango de fechas';
    this.applyRouteFilter();
    this.closeCalendar();
  }

  // Aplicar el rango de fechas seleccionado
  aplicarSeleccion() {
    if (this.rangeDates && this.rangeDates[0] && this.rangeDates[1]) {
      // Formatear las fechas al formato YYYY-MM-DD
      const fechasFormateadas = this.rangeDates.map(fecha => {
        return fecha.toISOString().split('T')[0]; // Extraer solo la parte de la fecha (YYYY-MM-DD)
      });

      this.filtersChanges.emit({
        fecha_inicio: fechasFormateadas[0],
        fecha_fin: fechasFormateadas[1],
        ...this.filtros, // Incluir los filtros adicionales (estado)
      });
    } else {
      console.log('No se ha seleccionado un rango de fechas.');
      this.messageService.add({ severity: 'warn', summary: 'Seleccionar Fechas', detail: 'No se ha seleccionado un rango de fechas.' });
    }
    this.closeCalendar();
  }

  // Cerrar el calendario
  closeCalendar(): void {
    if (this.calendar) {
      this.calendar.hideOverlay();
      console.log('Calendar overlay closed.');
    }
  }

  // Mostrar modal
  mostrarModal() {
    this.mostrarModalFiltros = true;
  }

  // Cerrar modal y emitir filtros
  cerrarModal(filtros?: any) {
    this.mostrarModalFiltros = false;

    if (filtros) {
      console.log('Filtros recibidos del modal de desembolsos:', filtros);

      // Emitir los filtros del modal junto con los filtros previos (como el estado)
      this.filtersChanges.emit({
        ...this.filtros, // Incluir filtros ya aplicados (como el estado)
        ...filtros // Incluir los filtros recibidos del modal
      });
    }
  }


  async pagarDesembolsos() {
    try {
      const ids: number[] = JSON.parse(localStorage.getItem('desembolsosSeleccionados') || '[]');
      if (!ids || ids.length === 0) {
        this.messageService.add({ severity: 'warn', summary: 'Procesar', detail: 'Seleccione al menos un desembolso.' });
        return;
      }
      this.messageService.add({ severity: 'info', summary: 'Procesando', detail: 'Actualizando desembolsos seleccionados...' });
      const resp = await this.synergyProvider.pagarDesembolsos(ids);
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: resp?.message || 'Desembolsos pagados.' });
      // limpiar selección
      localStorage.removeItem('desembolsosSeleccionados');
      // recargar lista aplicando filtros actuales
      this.loadSolicitudes();
    } catch (error: any) {
      console.error('Error al procesar desembolsos:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message || 'No se pudo procesar.' });
    }
  }
}
