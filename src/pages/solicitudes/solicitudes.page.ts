import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynergyProvider } from '../../providers/synergy.provider';
import { Solicitud } from '../../models/solicitud.model';
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { TablaSolicitudesComponent } from '../../components/tabla-solicitudes/tabla-solicitudes.component';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { SidebarProvider } from '../../providers/sidebar.provider';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
  standalone: true,
  providers: [SynergyProvider],
  imports: [FiltrosComponent, TablaSolicitudesComponent, CommonModule],
})
export class SolicitudesPage implements OnInit {
  solicitudes: Solicitud[] = [];
  filtros: any = {};
  loading = false;


  // Propiedades de paginación
  totalPages = 0;
  page = 1;           // Página actual (1-indexed para el backend)
  perPage = 10;       // Registros por página
  totalRecords = 0;   // Total de registros en la base de datos
  first = 0;          // Índice del primer registro (0-indexed para PrimeNG)


  constructor(
    private sidebarProvider: SidebarProvider,
    private synergyProvider: SynergyProvider,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.sidebarProvider.setToggle(false);

    if (this.route.snapshot.routeConfig?.path) {
      console.log(this.route.snapshot.routeConfig?.path);
      this.typeRoute(this.route.snapshot.routeConfig.path);
    }
  }


  typeRoute(tipo: string) {
    if (tipo === 'aprobadas') {
      this.filtros = { estado: 2 };
    } else if (tipo === 'denegadas') {
      this.filtros = { estado: 3 };
    } else {
      this.filtros = { estado: 1 };
    }
    this.loadSolicitudes();
  }
  /**
   * Método para cargar las solicitudes desde el servicio
   * con los filtros aplicados.
   */
  async loadSolicitudes(page: number = this.page, perPage: number = this.perPage) {
    // ✅ Agregar validación de parámetros
    if (isNaN(page) || isNaN(perPage) || page < 1 || perPage < 1) {
      console.error('Parámetros inválidos:', { page, perPage });
      this.messageService.add({
        severity: 'error',
        summary: 'Error de paginación',
        detail: 'Parámetros de paginación inválidos'
      });
      return;
    }

    this.loading = true;

    try {
      // Limpiar solicitudes mientras se cargan las nuevas
      if (page === 1) {
        this.solicitudes = [];
      }

      const response = await this.synergyProvider.getRequest(page, perPage, this.filtros);

      if (response?.data?.solicitudes) {
        // Asegurar que siempre sea un array
        this.solicitudes = Array.isArray(response.data.solicitudes)
          ? response.data.solicitudes
          : [response.data.solicitudes];

        // ✅ CORREGIR: Calcular correctamente el total de registros
        this.totalPages = response.data.total_pages || 0;
        this.totalRecords = (response.data.total_pages || 0) * (response.data.per_page || this.perPage);

        // Actualizar el índice first para PrimeNG
        this.first = (this.page - 1) * this.perPage;

        console.log('Datos de paginación:', {
          page: this.page,
          perPage: this.perPage,
          totalRecords: this.totalRecords, // Ahora será 2 * 10 = 20
          totalPages: this.totalPages,     // Será 2
          first: this.first,
          solicitudesLength: this.solicitudes.length
        });

      } else {
        this.solicitudes = [];
        this.totalPages = 0;
        this.totalRecords = 0;
        this.first = 0;
      }

    } catch (error: any) {
      console.error('Error al cargar solicitudes:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error al obtener solicitudes',
        detail: error.message || 'Error desconocido'
      });

      // Resetear datos en caso de error
      this.solicitudes = [];
      this.totalPages = 0;
      this.totalRecords = 0;
      this.first = 0;

    } finally {
      this.loading = false;
    }
  }
  /**
   * Método que recibe los filtros desde el componente FiltrosComponent
   */
  applyFilters(filtros: any) {
    console.log("Aplicando filtros:", filtros);
    this.page = 1;
    this.filtros = filtros;
    this.first = 0;
    this.loadSolicitudes(1, this.perPage);
  }

  /**
   * Método que maneja los cambios de paginación desde la tabla
   */
  onPageChange(event: any) {
    console.log('Evento de paginación:', event);

    // ✅ Calcular la página basándose en first y rows
    this.first = event.first;
    this.perPage = event.rows;

    // Calcular la página: first = (page - 1) * perPage
    // Por lo tanto: page = (first / perPage) + 1
    this.page = Math.floor(event.first / event.rows) + 1;

    console.log('Valores calculados:', {
      page: this.page,
      perPage: this.perPage,
      first: this.first
    });

    this.loadSolicitudes(this.page, this.perPage);
  }

  //Metodo para cambiar la páginación a una página especifica
  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.first = (pageNumber - 1) * this.perPage;
      this.loadSolicitudes(this.page, this.perPage);
    }
  }

  // Metodo para cambiar el número de registros por página
  changeRowsPerPage(newRowsPerPage: number) {
    this.perPage = newRowsPerPage;
    this.page = 1;
    this.first = 0;
    this.loadSolicitudes(this.page, this.perPage);
  }
}
