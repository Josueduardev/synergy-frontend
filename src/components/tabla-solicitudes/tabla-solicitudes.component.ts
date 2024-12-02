import { Component, OnInit, Input } from '@angular/core';
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
  @Input() solicitudes: Solicitud[] = [];  // Recibimos las solicitudes del componente padre
  cols: any[] = [];
  loading: boolean = false;

  constructor(private router: Router) {} // Inyectar Router

  ngOnInit(): void {
    // Definición de columnas con tipos de filtros
    this.cols = [
      { field: 'cliente', header: 'Cliente', filterType: 'text' },
      { field: 'correo', header: 'Correo', filterType: 'text' },
      { field: 'nrc', header: 'NRC Emisor', filterType: 'text' },
      { field: 'encargado', header: 'Encargado', filterType: 'text' },
      { field: 'telefono', header: 'Teléfono', filterType: 'text' },
      { field: 'monto', header: 'Monto', filterType: 'text' },
      { field: 'interes', header: 'Interés', filterType: 'text' },
    ];
  }

  onPageChange(event: any): void {
    console.log('Cambio de página:', event);
    // Aquí puedes emitir eventos o hacer algo con la página seleccionada
  }

  // Método para redirigir al detalle de la solicitud
  verSolicitud(solicitud: any): void {
    // Redirigir a la ruta de detalle de la solicitud, pasando el id de la solicitud
    this.router.navigate(['solicitudes/detalle', solicitud.id]);
  }
}
