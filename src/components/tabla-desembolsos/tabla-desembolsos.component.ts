import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { DesembolsoListado } from '../../models/Desembolsos.model.';

@Component({
  selector: 'app-tabla-desembolsos',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, PaginatorModule],
  templateUrl: './tabla-desembolsos.component.html',
  styleUrls: ['./tabla-desembolsos.component.scss'],
})
export class TablasDesembolsosComponents implements OnInit, OnChanges {
  // ✅ Propiedades de entrada para paginación
  @Input() desembolsos: DesembolsoListado[] = [];
  @Input() totalRecords: number = 0;
  @Input() rows: number = 10;
  @Input() currentPage: number = 1;
  @Input() first: number = 0;
  @Input() loading: boolean = false;

  // ✅ Output para cambios de página
  @Output() onPageChange = new EventEmitter<any>();

  selectedDesembolsos: DesembolsoListado[] = [];
  cols: any[] = [];

  // Filtros aplicados y datos filtrados de la página actual
  private filterMeta: any = {};
  filteredDesembolsos: DesembolsoListado[] = [];
  private filtersActive: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeColumns();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['desembolsos']) {
      // Re-aplicar filtros cuando cambia el lote (página) de datos
      this.applyFilters();
    }
  }

  private initializeColumns(): void {
    this.cols = [
      { field: 'solicitud.factura.proveedor.razon_social', header: 'Cliente', filterType: 'text' },
      { field: 'solicitud.factura.proveedor.correo_electronico', header: 'Correo', filterType: 'text' },
      { field: 'solicitud.factura.no_factura', header: 'No. factura', filterType: 'text' },
      { field: 'solicitud.nombre_cliente', header: 'Encargado', filterType: 'text' },
      { field: 'solicitud.factura.proveedor.telefono', header: 'Teléfono', filterType: 'text' },
      { field: 'monto_final', header: 'Monto a desembolsar', filterType: 'text' },
      { field: 'metodo_pago', header: 'Método de pago', filterType: 'text' },
    ];
  }

  // ✅ Método para manejar cambios de página
  handlePageChange(event: any): void {
    console.log('Cambio de página en tabla desembolsos:', event);
    this.onPageChange.emit(event);
  }

  // Dataset que se muestra en la tabla (filtrado sobre el lote actual)
  get displayedDesembolsos(): DesembolsoListado[] {
    return this.filtersActive ? this.filteredDesembolsos : this.desembolsos;
  }

  // Manejar evento de filtros del p-table (lazy)
  handleFilter(event: any): void {
    this.filterMeta = event?.filters || {};
    this.applyFilters();
  }

  private applyFilters(): void {
    const data = this.desembolsos || [];
    const filters = this.filterMeta || {};

    // Si no hay filtros activos, limpiar resultado
    const hasAnyFilter = Object.values(filters).some((f: any) => Array.isArray(f?.constraints) ? f.constraints.some((c: any) => c?.value) : !!f?.value);
    this.filtersActive = hasAnyFilter;
    if (!this.filtersActive) {
      this.filteredDesembolsos = [];
      return;
    }

    this.filteredDesembolsos = data.filter((row: any) => this.matchesAll(row, filters));
  }

  private matchesAll(row: any, filters: any): boolean {
    for (const field of Object.keys(filters)) {
      const meta = filters[field];
      if (!this.matches(row, field, meta)) {
        return false;
      }
    }
    return true;
  }

  private matches(row: any, fieldPath: string, meta: any): boolean {
    // PrimeNG columnFilter en lazy produce meta con constraints
    const constraints = Array.isArray(meta?.constraints) ? meta.constraints : [{ value: meta?.value, matchMode: meta?.matchMode }];
    const value = this.getByPath(row, fieldPath);
    const valueStr = (value !== null && value !== undefined) ? String(value).toLowerCase() : '';

    // Cumplir TODAS las constraints (AND)
    return constraints.every((c: any) => {
      const search = (c?.value !== null && c?.value !== undefined) ? String(c.value).toLowerCase() : '';
      if (!search) return true; // constraint vacía no filtra
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

  // Método para ver detalle del desembolso
  verDetalle(desembolso: any): void {
    this.router.navigate(['desembolso/detalle-desembolso', desembolso.id]);
  }

  // Metodo para verificar si hay desembolsos procesados
  tieneDesembolsosProcesados(): boolean {
    return this.desembolsos.some(s => s.estado === 5);
  }

  tieneDesembolsosPagados(): boolean {
    return this.desembolsos.some(s => s.estado === 7);
  }

  tieneDesembolsosPagadosICC(): boolean {
    return this.desembolsos.some(s => s.estado === 8);
  }

  obtenerDesembolsosSeleccionados(): void {
    console.log("Desembolsos seleccionados:", this.selectedDesembolsos);
  }

  // Sincronizar cambios de selección a localStorage para que el botón de filtros pueda procesarlos
  onSelectionChange(selected: any[]) {
    try {
      const ids = (selected || []).map((d: any) => d?.id).filter((id: any) => typeof id === 'number');
      localStorage.setItem('desembolsosSeleccionados', JSON.stringify(ids));
    } catch (e) {
      console.error('Error guardando desembolsos seleccionados:', e);
    }
  }
}
