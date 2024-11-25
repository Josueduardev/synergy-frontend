import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-tabla-solicitudes',
  standalone: true,
  imports: [CommonModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
],
  templateUrl: './tabla-solicitudes.component.html',
  styleUrls: ['./tabla-solicitudes.component.scss'],
})
export class TablaSolicitudesComponent implements OnInit {
  solicitudes: any[] = [];
  cols: any[] = [];
  totalRecords: number = 30; // Total de registros
  rows: number = 10; // Filas por página

  constructor() {}

  ngOnInit(): void {
    // Definición de columnas con tipos de filtros
    this.cols = [
      { field: 'cliente', header: 'Cliente', filterType: 'text' },
      { field: 'correo', header: 'Correo', filterType: 'text' },
      { field: 'nrc', header: 'NRC Emisor', filterType: 'text' },
      { field: 'encargado', header: 'Encargado', filterType: 'text' },
      { field: 'telefono', header: 'Teléfono', filterType: 'text' },
      { field: 'monto', header: 'Monto', filterType: 'numeric' },
      { field: 'interes', header: 'Interés', filterType: 'numeric' },
    ];
    // Registros quemados
    this.solicitudes = [
      { cliente: 'Juan Pérez', correo: 'juan.perez@example.com', nrc: '12345', encargado: 'Ana López', telefono: '+503 1234-5678', monto: 1000, interes: '5%' },
      { cliente: 'María López', correo: 'maria.lopez@example.com', nrc: '23456', encargado: 'Luis Gómez', telefono: '+503 5678-1234', monto: 2000, interes: '3%' },
      { cliente: 'Carlos Hernández', correo: 'carlos.hernandez@example.com', nrc: '34567', encargado: 'Pedro Sánchez', telefono: '+503 9876-5432', monto: 3000, interes: '4%' },
      { cliente: 'Ana González', correo: 'ana.gonzalez@example.com', nrc: '45678', encargado: 'Carmen Ruiz', telefono: '+503 3456-7890', monto: 4000, interes: '6%' },
      { cliente: 'Luis Martínez', correo: 'luis.martinez@example.com', nrc: '56789', encargado: 'Raúl Pérez', telefono: '+503 4321-0987', monto: 5000, interes: '7%' },
      { cliente: 'Pedro Gutiérrez', correo: 'pedro.gutierrez@example.com', nrc: '67890', encargado: 'Laura Torres', telefono: '+503 7654-3210', monto: 6000, interes: '2%' },
      { cliente: 'Laura Torres', correo: 'laura.torres@example.com', nrc: '78901', encargado: 'Carlos Ramírez', telefono: '+503 8765-4321', monto: 7000, interes: '8%' },
      { cliente: 'Raúl Ramírez', correo: 'raul.ramirez@example.com', nrc: '89012', encargado: 'Sofía Castro', telefono: '+503 6543-2109', monto: 8000, interes: '9%' },
      { cliente: 'Sofía Castro', correo: 'sofia.castro@example.com', nrc: '90123', encargado: 'María León', telefono: '+503 5432-1098', monto: 9000, interes: '1%' },
      { cliente: 'María León', correo: 'maria.leon@example.com', nrc: '01234', encargado: 'Jorge Fernández', telefono: '+503 2109-8765', monto: 10000, interes: '5%' },
      { cliente: 'Ricardo Álvarez', correo: 'ricardo.alvarez@example.com', nrc: '11234', encargado: 'Ana Morales', telefono: '+503 5678-2345', monto: 11000, interes: '6%' },
      { cliente: 'Ana Morales', correo: 'ana.morales@example.com', nrc: '22345', encargado: 'Luis Torres', telefono: '+503 8765-1234', monto: 12000, interes: '7%' },
      { cliente: 'Luis Torres', correo: 'luis.torres@example.com', nrc: '33456', encargado: 'Carmen Gutiérrez', telefono: '+503 5432-6789', monto: 13000, interes: '4%' },
      { cliente: 'Carmen Gutiérrez', correo: 'carmen.gutierrez@example.com', nrc: '44567', encargado: 'Juan Ramírez', telefono: '+503 2109-5432', monto: 14000, interes: '3%' },
      { cliente: 'Juan Pérez', correo: 'juan.perez@example.com', nrc: '12345', encargado: 'Ana López', telefono: '+503 1234-5678', monto: 1000, interes: '5%' },
      { cliente: 'María López', correo: 'maria.lopez@example.com', nrc: '23456', encargado: 'Luis Gómez', telefono: '+503 5678-1234', monto: 2000, interes: '3%' },
      { cliente: 'Carlos Hernández', correo: 'carlos.hernandez@example.com', nrc: '34567', encargado: 'Pedro Sánchez', telefono: '+503 9876-5432', monto: 3000, interes: '4%' },
      { cliente: 'Ana González', correo: 'ana.gonzalez@example.com', nrc: '45678', encargado: 'Carmen Ruiz', telefono: '+503 3456-7890', monto: 4000, interes: '6%' },
      { cliente: 'Luis Martínez', correo: 'luis.martinez@example.com', nrc: '56789', encargado: 'Raúl Pérez', telefono: '+503 4321-0987', monto: 5000, interes: '7%' },
      { cliente: 'Pedro Gutiérrez', correo: 'pedro.gutierrez@example.com', nrc: '67890', encargado: 'Laura Torres', telefono: '+503 7654-3210', monto: 6000, interes: '2%' },
      { cliente: 'Laura Torres', correo: 'laura.torres@example.com', nrc: '78901', encargado: 'Carlos Ramírez', telefono: '+503 8765-4321', monto: 7000, interes: '8%' },
      { cliente: 'Raúl Ramírez', correo: 'raul.ramirez@example.com', nrc: '89012', encargado: 'Sofía Castro', telefono: '+503 6543-2109', monto: 8000, interes: '9%' },
      { cliente: 'Sofía Castro', correo: 'sofia.castro@example.com', nrc: '90123', encargado: 'María León', telefono: '+503 5432-1098', monto: 9000, interes: '1%' },
      { cliente: 'María León', correo: 'maria.leon@example.com', nrc: '01234', encargado: 'Jorge Fernández', telefono: '+503 2109-8765', monto: 10000, interes: '5%' },
      { cliente: 'Ricardo Álvarez', correo: 'ricardo.alvarez@example.com', nrc: '11234', encargado: 'Ana Morales', telefono: '+503 5678-2345', monto: 11000, interes: '6%' },
      { cliente: 'Ana Morales', correo: 'ana.morales@example.com', nrc: '22345', encargado: 'Luis Torres', telefono: '+503 8765-1234', monto: 12000, interes: '7%' },
      { cliente: 'Luis Torres', correo: 'luis.torres@example.com', nrc: '33456', encargado: 'Carmen Gutiérrez', telefono: '+503 5432-6789', monto: 13000, interes: '4%' },
      { cliente: 'Carmen Gutiérrez', correo: 'carmen.gutierrez@example.com', nrc: '44567', encargado: 'Juan Ramírez', telefono: '+503 2109-5432', monto: 14000, interes: '3%' },
      { cliente: 'Juan Pérez', correo: 'juan.perez@example.com', nrc: '12345', encargado: 'Ana López', telefono: '+503 1234-5678', monto: 1000, interes: '5%' },
      { cliente: 'María López', correo: 'maria.lopez@example.com', nrc: '23456', encargado: 'Luis Gómez', telefono: '+503 5678-1234', monto: 2000, interes: '3%' },
      { cliente: 'Carlos Hernández', correo: 'carlos.hernandez@example.com', nrc: '34567', encargado: 'Pedro Sánchez', telefono: '+503 9876-5432', monto: 3000, interes: '4%' },
      { cliente: 'Ana González', correo: 'ana.gonzalez@example.com', nrc: '45678', encargado: 'Carmen Ruiz', telefono: '+503 3456-7890', monto: 4000, interes: '6%' },
      { cliente: 'Luis Martínez', correo: 'luis.martinez@example.com', nrc: '56789', encargado: 'Raúl Pérez', telefono: '+503 4321-0987', monto: 5000, interes: '7%' },
      { cliente: 'Pedro Gutiérrez', correo: 'pedro.gutierrez@example.com', nrc: '67890', encargado: 'Laura Torres', telefono: '+503 7654-3210', monto: 6000, interes: '2%' },
      { cliente: 'Laura Torres', correo: 'laura.torres@example.com', nrc: '78901', encargado: 'Carlos Ramírez', telefono: '+503 8765-4321', monto: 7000, interes: '8%' },
      { cliente: 'Raúl Ramírez', correo: 'raul.ramirez@example.com', nrc: '89012', encargado: 'Sofía Castro', telefono: '+503 6543-2109', monto: 8000, interes: '9%' },
      { cliente: 'Sofía Castro', correo: 'sofia.castro@example.com', nrc: '90123', encargado: 'María León', telefono: '+503 5432-1098', monto: 9000, interes: '1%' },
      { cliente: 'María León', correo: 'maria.leon@example.com', nrc: '01234', encargado: 'Jorge Fernández', telefono: '+503 2109-8765', monto: 10000, interes: '5%' },
      { cliente: 'Ricardo Álvarez', correo: 'ricardo.alvarez@example.com', nrc: '11234', encargado: 'Ana Morales', telefono: '+503 5678-2345', monto: 11000, interes: '6%' },
      { cliente: 'Ana Morales', correo: 'ana.morales@example.com', nrc: '22345', encargado: 'Luis Torres', telefono: '+503 8765-1234', monto: 12000, interes: '7%' },
      { cliente: 'Luis Torres', correo: 'luis.torres@example.com', nrc: '33456', encargado: 'Carmen Gutiérrez', telefono: '+503 5432-6789', monto: 13000, interes: '4%' },
      { cliente: 'Carmen Gutiérrez', correo: 'carmen.gutierrez@example.com', nrc: '44567', encargado: 'Juan Ramírez', telefono: '+503 2109-5432', monto: 14000, interes: '3%' },
      // 15 registros adicionales hasta completar 30...
    ];
  }

  onPageChange(event: any): void {
    console.log('Cambio de página:', event);
  }

  verSolicitud(solicitud: any): void {
    console.log('Detalle de solicitud:', solicitud);
  }
}
