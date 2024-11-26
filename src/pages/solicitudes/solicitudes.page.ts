import { Component } from '@angular/core';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { TablaSolicitudesComponent } from '../../components/tabla-solicitudes/tabla-solicitudes.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
  standalone: true,
  imports: [FiltrosComponent, TablaSolicitudesComponent], // Importamos ambos componentes standalone
})
export class SolicitudesPage {}
