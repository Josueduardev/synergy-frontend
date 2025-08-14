import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { desembolso } from '../../models/Desembolsos.model.';

@Component({
  selector: 'app-tabla-desembolsos',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, PaginatorModule],
  templateUrl: './tabla-desembolsos.component.html',
  styleUrls: ['./tabla-desembolsos.component.scss'],
})
export class TablasDesembolsosComponents implements OnInit {
  // ✅ Propiedades de entrada para paginación
  @Input() desembolsos: desembolso[] = [];
  @Input() totalRecords: number = 0;
  @Input() rows: number = 10;
  @Input() currentPage: number = 1;
  @Input() first: number = 0;
  @Input() loading: boolean = false;

  // ✅ Output para cambios de página
  @Output() onPageChange = new EventEmitter<any>();

  selectedDesembolsos: desembolso[] = [];
  cols: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.cols = [
      { field: 'factura.proveedor.razon_social', header: 'Cliente', filterType: 'text' },
      { field: 'factura.proveedor.correo_electronico', header: 'Correo', filterType: 'text' },
      { field: 'factura.proveedor.nrc', header: 'NRC Emisor', filterType: 'text' },
      { field: 'nombre_cliente', header: 'Encargado', filterType: 'text' },
      { field: 'factura.proveedor.telefono', header: 'Teléfono', filterType: 'text' },
      { field: 'factura.monto', header: 'Monto', filterType: 'text' },
      { field: 'interes', header: 'Interés', filterType: 'text' },
    ];
  }

  // ✅ Método para manejar cambios de página
  handlePageChange(event: any): void {
    console.log('Cambio de página en tabla desembolsos:', event);
    this.onPageChange.emit(event);
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

  obtenerDesembolsosSeleccionados(): void {
    console.log("Desembolsos seleccionados:", this.selectedDesembolsos);
  }
}
