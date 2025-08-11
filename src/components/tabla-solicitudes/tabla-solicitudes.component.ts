import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { Solicitud } from '../../models/solicitud.model';

@Component({
  selector: 'app-tabla-solicitudes',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, PaginatorModule],
  templateUrl: './tabla-solicitudes.component.html',
  styleUrls: ['./tabla-solicitudes.component.scss'],
})
export class TablaSolicitudesComponent implements OnInit {
 // Propiedades de entrada
  @Input() solicitudes: Solicitud[] = [];
  @Input() totalRecords: number = 0;    // Total de registros en la BD
  @Input() rows: number = 10;           // Registros por página
  @Input() currentPage: number = 1;     // Página actual (1-indexed)
  @Input() first: number = 0;           // Primer registro (0-indexed para PrimeNG)
  @Input() loading: boolean = false;    // Estado de carga
  @Input() storageKey: string = 'solicitudesSeleccionadas';

  @Output() onPageChange = new EventEmitter<any>();

  selectedSolicitudes: Solicitud[] = [];
  cols: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeColumns();
    this.loadSelectedSolicitudes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambian las solicitudes, verificar selecciones guardadas
    if (changes['solicitudes'] && changes['solicitudes'].currentValue) {
      this.loadSelectedSolicitudes();
    }
  }


  /**
   * Inicializar las columnas de la tabla
   */
  private initializeColumns(): void {
  this.cols = [
    {
      field: 'factura.proveedor.razon_social',
      header: 'Cliente',
      filterType: 'text',
      sortable: true
    },
    {
      field: 'factura.proveedor.correo_electronico',
      header: 'Correo',
      filterType: 'text',
      sortable: true
    },
    {
      field: 'factura.proveedor.nrc',
      header: 'NRC Emisor',
      filterType: 'text',
      sortable: false
    },
    {
      field: 'nombre_cliente',
      header: 'Encargado',
      filterType: 'text',
      sortable: true
    },
    {
      field: 'factura.proveedor.telefono',
      header: 'Teléfono',
      filterType: 'text',
      sortable: false
    },
    {
      field: 'factura.monto',
      header: 'Monto',
      filterType: 'numeric',
      sortable: true
    },
    {
      field: 'interes',
      header: 'Interés',
      filterType: 'numeric',
      sortable: true
    }
  ];
}

  handlePageChange(event: any): void {
    this.onPageChange.emit(event);
  }

  handleFilter(event: any): void {
    // Al filtrar, reseteamos a la primera página
    const lazyEvent = {
      first: 0,
      rows: this.rows,
      filters: event.filters
    };
    this.onPageChange.emit(lazyEvent);
  }

  // Método para redirigir al detalle de la solicitud
  verSolicitud(solicitud: any): void {
    // Redirigir a la ruta de detalle de la solicitud, pasando el id de la solicitud
    this.router.navigate(['solicitudes/detalle/', solicitud.id]);
  }

  // Metodo para verificar si hay solicitudes aprobadas
  tieneSolicitudesAprobadas(): boolean {
    return this.solicitudes.some(s => s.estado === 'APROBADA' );
  }

  tieneSolicitudesDenegadas(): boolean {
    return this.solicitudes.some(s => s.estado === 'DENEGADA' );
  }

  // Método para obtener las solicitudes seleccionadas
  obtenerSolicitudesSeleccionadas(): void {
    console.log("Solicitudes seleccionadas:", this.selectedSolicitudes);
  }

  onSelectedSolicitudesChange(): void {
    const selectedIds = this.selectedSolicitudes.map(solicitud => solicitud.id);

    if (this.storageKey) {
      // Cargar IDs ya seleccionados de otras páginas
      const existingIds = this.getStoredSelectedIds();

      // Remover IDs de la página actual
      const filteredExistingIds = existingIds.filter(id =>
        !this.solicitudes.some(solicitud => solicitud.id === id)
      );

      // Agregar nuevos IDs seleccionados
      const allSelectedIds = [...filteredExistingIds, ...selectedIds];

      localStorage.setItem(this.storageKey, JSON.stringify(allSelectedIds));
      console.log('IDs seleccionados guardados:', allSelectedIds);
    }
  }

  /**
   * Cargar solicitudes seleccionadas del localStorage
   */
  private loadSelectedSolicitudes(): void {
    if (this.storageKey) {
      const selectedIds = this.getStoredSelectedIds();

      // Encontrar solicitudes seleccionadas en la página actual
      this.selectedSolicitudes = this.solicitudes.filter(solicitud =>
        selectedIds.includes(solicitud.id)
      );

      console.log('Solicitudes seleccionadas cargadas:', this.selectedSolicitudes.length);
    }
  }
  /**
   * Obtener IDs seleccionados del localStorage
   */
  private getStoredSelectedIds(): any[] {
    if (!this.storageKey) return [];

    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al cargar selecciones del localStorage:', error);
      return [];
    }
  }

  /**
   * Limpiar selecciones guardadas
   */
  clearSelectedSolicitudes(): void {
    this.selectedSolicitudes = [];
    if (this.storageKey) {
      localStorage.removeItem(this.storageKey);
    }
  }

  /**
   * Obtener información de paginación para mostrar
   */
  getPaginationInfo(): string {
    const start = this.first + 1;
    const end = Math.min(this.first + this.rows, this.totalRecords);
    return `Mostrando ${start} - ${end} de ${this.totalRecords} registros`;
  }

}
