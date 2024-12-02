import { Component, OnInit } from '@angular/core';
import { SynergyProvider } from '../../providers/synergy.provider';
import { Solicitud } from '../../models/solicitud.model';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { TablaSolicitudesComponent } from '../../components/tabla-solicitudes/tabla-solicitudes.component';
import { MessageService } from 'primeng/api';
import { SharedComponent } from '../../components/shared/shared.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
  standalone: true,
  providers: [SynergyProvider],
  imports: [FiltrosComponent, TablaSolicitudesComponent],
})
export class SolicitudesPage implements OnInit {
  solicitudes: Solicitud[] = [];  // Asegúrate de que sea un arreglo de tipo Solicitud
  filtros: any = {};  // Aquí guardamos los filtros seleccionados
  loading = false;
  totalPages = 0;  // Total de páginas disponibles
  page = 1;         // Página inicial
  perPage = 10;     // Registros por página

  constructor(private sharedComponent: SharedComponent,private synergyProvider: SynergyProvider,private messageService: MessageService) {}

  ngOnInit() {
    // Abrir el sidebar al cargar la página
    this.sharedComponent.sidebarVisible = true;
    // Cargar solicitudes al inicio
    this.loadSolicitudes();
  }

  /**
   * Método para cargar las solicitudes desde el servicio
   * con los filtros aplicados.
   */
  async loadSolicitudes(page: number = this.page, perPage: number = this.perPage) {
    this.loading = true;
    try {
      const response = await this.synergyProvider.getRequest(page, perPage, this.filtros);

      // Asegúrate de que 'solicitudes' sea un arreglo
      if (response && response.data && Array.isArray(response.data.solicitudes)) {
        this.solicitudes = response.data.solicitudes;
        this.totalPages = response.data.total_pages || 0;  // Usamos total_pages para la paginación
      } else {
        this.solicitudes = [];  // Si no es un array, inicializamos con un array vacío
        this.totalPages = 0;
      }
    } catch (error:any) {
      this.messageService.add({ severity: 'error', summary: 'Error al obtener la solicitud', detail: error.message });
      console.error('Error al obtener solicitudes', error);
    } finally {
      this.loading = false;
    }
  }

  /**
   * Método que recibe los filtros desde el componente FiltrosComponent
   */
  applyFilters(filtros: any) {
    console.log("Data: ",filtros)
    this.filtros = filtros;  // Actualizamos los filtros
    this.page = 1;  // Resetear a la primera página
    this.loadSolicitudes();  // Recargamos las solicitudes con los nuevos filtros
  }

  /**
   * Método que maneja la paginación
   */
  onPageChange(event: any) {
    this.page = event.page + 1;  // Ajuste en caso de que la API sea 1-indexed
    this.loadSolicitudes();  // Recargar las solicitudes con la nueva página
  }
}
