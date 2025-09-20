import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SynergyProvider } from '../../../providers/synergy.provider';
import { Router } from '@angular/router';


@Component({
  selector: 'app-procesar-button',
  standalone: true,
  imports: [],
  templateUrl: './procesar-button.component.html',
  styleUrl: './procesar-button.component.scss'
})
export class ProcesarButtonComponent {
  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private synergyProvider: SynergyProvider,
    private router: Router
  ) {}

  async procesarDesembolsos() {
    try {
      this.loading = true;

      // Obtener y validar los IDs seleccionados
      const desembolsosSeleccionados = localStorage.getItem('desembolsosSeleccionados');
      console.log('Desembolsos en localStorage:', desembolsosSeleccionados);

      let ids: number[] = [];
      try {
        ids = desembolsosSeleccionados ? JSON.parse(desembolsosSeleccionados) : [];
      } catch (parseError) {
        console.error('Error parseando desembolsos seleccionados:', parseError);
        ids = [];
      }

      console.log('IDs parseados:', ids);
      console.log('Tipo de IDs:', typeof ids, 'Es array:', Array.isArray(ids));
      console.log('Longitud:', ids?.length);

      // Validación más estricta
      if (!Array.isArray(ids) || ids.length === 0 || ids.some(id => typeof id !== 'number' || isNaN(id))) {
        console.log('Validación falló - IDs inválidos');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se han seleccionado ningún desembolso válido.' });
        this.loading = false;
        return;
      }

      // Validación adicional antes de procesar
      console.log('Procesando desembolsos con IDs:', ids);

      this.messageService.add({ severity: 'info', summary: 'Procesando', detail: `Actualizando ${ids.length} desembolso(s) seleccionado(s)...` });
      const response = await this.synergyProvider.actualizarDesembolsos(ids);

      if (response) {
        this.messageService.add({
          severity: 'success',
          summary: 'Procesar',
          detail: 'Se procesarán las solicitudes seleccionadas.'
        });
        this.loading = false;

        // Limpiar selección
        localStorage.removeItem('desembolsosSeleccionados');

        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/desembolso/procesadas']);
        }, 2000);
      } else {
        // Fallback por si la respuesta está vacía pero fue exitosa
        console.log('Empty response but successful');
        this.messageService.add({
          severity: 'success',
          summary: 'Procesar',
          detail: 'Se procesarán las solicitudes seleccionadas.'
        });
        this.loading = false;
        localStorage.removeItem('desembolsosSeleccionados');

        setTimeout(() => {
          this.router.navigate(['/desembolso/procesadas']);
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error al procesar desembolsos:', error);
      console.error('Error completo:', JSON.stringify(error));
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || 'No se pudo procesar los desembolsos.'
      });
      this.loading = false;
    } finally {
      // Asegurar que loading siempre se resetee
      this.loading = false;
    }
  }
}
