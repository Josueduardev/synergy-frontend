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
      const ids: number[] = JSON.parse(localStorage.getItem('desembolsosSeleccionados') || '[]');
      
      if (!ids || ids.length === 0) {
        this.messageService.add({ severity: 'warn', summary: 'Procesar', detail: 'Seleccione al menos un desembolso.' });
        this.loading = false;
        return;
      }

      this.messageService.add({ severity: 'info', summary: 'Procesando', detail: 'Actualizando desembolsos seleccionados...' });
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
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: error?.message || 'No se pudo procesar.' 
      });
      this.loading = false;
    }
  }
}
