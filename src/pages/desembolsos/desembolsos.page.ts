import { Component, OnInit } from '@angular/core';
import { SynergyProvider } from '../../providers/synergy.provider';
import { desembolso } from '../../models/Desembolsos.model.';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { SidebarProvider } from '../../providers/sidebar.provider';
import { TablasDesembolsosComponents } from '../../components/tabla-desembolsos/tabla-desembolsos.component';
import { FiltrosDesembolsoComponent } from '../../components/filtros/Filtros-desembolsos/filtros.component';

@Component({
  selector: 'app-desembolsos',
  templateUrl: './desembolsos.page.html',
  styleUrls: ['./desembolsos.page.scss'],
  standalone: true,
  providers: [SynergyProvider],
  imports: [FiltrosDesembolsoComponent, TablasDesembolsosComponents],
})
export class DesembolsosPage implements OnInit {
  desembolsos: desembolso[] = [];  // Asegúrate de que sea un arreglo de tipo Solicitud
  filtros: any = {};  // Aquí guardamos los filtros seleccionados
  loading = false


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
    // Abrir el sidebar al cargar la página
    this.sidebarProvider.setToggle(false)
    if(this.route.snapshot.routeConfig?.path){
      console.log(this.route.snapshot.routeConfig?.path)
      this.typeRoute(this.route.snapshot.routeConfig.path);
    }
  }

  typeRoute(tipo:string){
    if(tipo=='procesadas'){
      this.filtros={estado: 6}
    }else if(tipo=='pagadas'){
      this.filtros={estado: 7}
    }else{
      this.filtros={estado: 5}
    }
    this.loadDesembolsos();
  }

  /**
   * Método para cargar las solicitudes desde el servicio
   * con los filtros aplicados.
   */
  async loadDesembolsos(page: number = this.page, perPage: number = this.perPage) {
    this.desembolsos = [];

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
      if (page === 1) {
        this.desembolsos = [];
      }
      const response = await this.synergyProvider.getRequestDesem(page, perPage, this.filtros);

      // Asegúrate de que 'desembolsos' sea un arreglo
      if (response?.data?.desembolsos) {

        // Asegurar que siempre sea un array
        this.desembolsos = Array.isArray(response.data.desembolsos)
        ? response.data.desembolsos
        : [response.data.desembolsos];


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
          desembolsosLength: this.desembolsos.length
        });

      } else {
        this.desembolsos = [];
        this.totalPages = 0;
        this.totalRecords = 0;
        this.first = 0;
      }
    } catch (error:any) {
      this.messageService.add({ severity: 'error', summary: 'Error al obtener la solicitud', detail: error.message });
      console.error('Error al obtener solicitudes', error);
      // Resetear datos en caso de error
      this.desembolsos = [];
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
    console.log("Data: ",filtros)
    this.filtros = filtros;  // Actualizamos los filtros
    this.page = 1;  // Resetear a la primera página
    this.first = 0;
    this.loadDesembolsos(1, this.perPage);  // Recargamos las solicitudes con los nuevos filtros
  }

  /**
   * Método que maneja la paginación
   */
  onPageChange(event: any) {
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

    this.loadDesembolsos(this.page, this.perPage);
  }


  //Metodo para cambiar la páginación a una página especifica
  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.first = (pageNumber - 1) * this.perPage;
      this.loadDesembolsos(this.page, this.perPage);
    }
  }

  // Metodo para cambiar el número de registros por página
  changeRowsPerPage(newRowsPerPage: number) {
    this.perPage = newRowsPerPage;
    this.page = 1;
    this.first = 0;
    this.loadDesembolsos(this.page, this.perPage);
  }
}
