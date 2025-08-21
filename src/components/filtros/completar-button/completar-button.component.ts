import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SynergyProvider } from '../../../providers/synergy.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completar-button',
  standalone: true,
  imports: [],
  templateUrl: './completar-button.component.html',
  styleUrl: './completar-button.component.scss'
})
export class CompletarButtonComponent {
  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private synergyProvider: SynergyProvider,
    private router: Router
  ) {}

  async pagarDesembolsos() {
    try {
      this.loading = true;
      const ids: number[] = JSON.parse(localStorage.getItem('desembolsosSeleccionados') || '[]');

      if (!ids || ids.length === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Completar',
          detail: 'Seleccione al menos un desembolso.'
        });
        this.loading = false;
        return;
      }

      this.messageService.add({
        severity: 'info',
        summary: 'Completando',
        detail: 'Procesando desembolsos seleccionados...'
      });

      const response = await this.synergyProvider.pagarDesembolsos(ids);

      if (response) {
        this.messageService.add({
          severity: 'success',
          summary: 'Completado',
          detail: 'Los desembolsos se han completado exitosamente.'
        });

        // Limpiar selección
        localStorage.removeItem('desembolsosSeleccionados');

        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/desembolso/pagados']);
        }, 2000);
      } else {
        // Fallback por si la respuesta está vacía pero fue exitosa
        console.log('Empty response but successful');
        this.messageService.add({
          severity: 'success',
          summary: 'Completado',
          detail: 'Los desembolsos se han completado exitosamente.'
        });

        localStorage.removeItem('desembolsosSeleccionados');

        setTimeout(() => {
          this.router.navigate(['/desembolso/pagados']);
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error al completar desembolsos:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || 'No se pudo completar el proceso.'
      });
    } finally {
      this.loading = false;
    }
  }
}
