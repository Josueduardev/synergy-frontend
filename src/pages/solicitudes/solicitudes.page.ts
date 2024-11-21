import { Component, OnInit } from '@angular/core';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { TablaSolicitudesComponent } from '../../components/tabla-solicitudes/tabla-solicitudes.component';
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
  standalone: true,
  imports: [FiltrosComponent,TablaSolicitudesComponent], // Importamos el componente Filtros
})
export class SolicitudesPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  onOpenAdvancedFilters() {
    console.log('Abrir modal de filtros avanzados');
    // Aquí manejarías la lógica para abrir el modal avanzado
  }
}
