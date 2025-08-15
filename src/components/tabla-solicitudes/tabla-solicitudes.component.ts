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
  // Estado para filtros locales y datos filtrados del lote actual
  private filterMeta: any = {};
  filteredSolicitudes: Solicitud[] = [];
  private filtersActive: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeColumns();
    this.loadSelectedSolicitudes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambian las solicitudes, verificar selecciones guardadas
    if (changes['solicitudes'] && changes['solicitudes'].currentValue) {
      this.loadSelectedSolicitudes();
      // Reaplicar filtros sobre el nuevo lote (página)
      this.applyFilters();
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

  // Dataset mostrado en la tabla (filtrado sobre el lote actual)
  get displayedSolicitudes(): Solicitud[] {
    return this.filtersActive ? this.filteredSolicitudes : this.solicitudes;
  }

  // Capturar filtros del p-table y aplicarlos localmente sin tocar paginación
  handleFilter(event: any): void {
    this.filterMeta = event?.filters || {};
    this.applyFilters();
  }

  private applyFilters(): void {
    const data = this.solicitudes || [];
    const filters = this.filterMeta || {};

    // Detectar si hay algún filtro activo
    const hasAnyFilter = Object.values(filters).some((f: any) => Array.isArray(f?.constraints) ? f.constraints.some((c: any) => c?.value) : !!f?.value);
    this.filtersActive = hasAnyFilter;
    if (!this.filtersActive) {
      this.filteredSolicitudes = [];
      return;
    }

    this.filteredSolicitudes = data.filter((row: any) => this.matchesAll(row, filters));
  }

  private matchesAll(row: any, filters: any): boolean {
    for (const field of Object.keys(filters)) {
      const meta = filters[field];
      if (!this.matches(row, field, meta)) return false;
    }
    return true;
  }

  private matches(row: any, fieldPath: string, meta: any): boolean {
    const constraints = Array.isArray(meta?.constraints) ? meta.constraints : [{ value: meta?.value, matchMode: meta?.matchMode }];
    const value = this.getByPath(row, fieldPath);
    const valueStr = (value !== null && value !== undefined) ? String(value).toLowerCase() : '';

    return constraints.every((c: any) => {
      const search = (c?.value !== null && c?.value !== undefined) ? String(c.value).toLowerCase() : '';
      if (!search) return true;
      const mode = c?.matchMode || 'contains';
      switch (mode) {
        case 'contains':
        default:
          return valueStr.includes(search);
      }
    });
  }

  private getByPath(obj: any, path: string): any {
    try {
      return path.split('.').reduce((acc: any, key: string) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
    } catch {
      return undefined;
    }
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
}
