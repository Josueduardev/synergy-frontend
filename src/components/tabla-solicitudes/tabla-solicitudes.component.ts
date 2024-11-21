import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-solicitudes',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, PaginatorModule],
  templateUrl: './tabla-solicitudes.component.html',
  styleUrls: ['./tabla-solicitudes.component.scss']
})
export class TablaSolicitudesComponent implements OnInit {
  solicitudes: any[] = [];
  cols: any[] = []; // Inicializamos cols como un arreglo vacío
  totalRecords: number = 100; // Simular total de registros
  rows: number = 10; // Filas por página
  first: number = 0; // Paginación inicial

  constructor() {}

  ngOnInit() {
    // Column definitions
    this.cols = [
      { field: 'cliente', header: 'Cliente' },
      { field: 'correo', header: 'Correo' },
      { field: 'nrc', header: 'NRC Emisor' },
      { field: 'encargado', header: 'Encargado' },
      { field: 'telefono', header: 'Teléfono' },
      { field: 'monto', header: 'Monto' },
      { field: 'interes', header: 'Interés' },
      { field: 'acciones', header: 'Acciones' }
    ];

    // Simulated data
    this.solicitudes = Array.from({ length: this.totalRecords }, (_, index) => ({
      cliente: `Nombre Completo Del Cliente ${index + 1}`,
      correo: `cliente${index + 1}@example.com`,
      nrc: `${Math.floor(Math.random() * 99999999)}`,
      encargado: `Nombre Completo Del Encargado ${index + 1}`,
      telefono: `123-456-${index.toString().padStart(4, '0')}`,
      monto: Math.floor(Math.random() * 10000),
      interes: `${Math.floor(Math.random() * 10)}%`
    }));
  }

  verSolicitud(solicitud: any) {
    console.log('Ver solicitud', solicitud);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    console.log('Cambio de página:', event);
  }
}
