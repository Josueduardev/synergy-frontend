import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-filtros-avanzados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-filtros-avanzados.component.html',
  styleUrls: ['./modal-filtros-avanzados.component.scss'],
})
export class ModalFiltrosAvanzadosComponent implements AfterViewInit {
  @Input() mostrar = false; // Controla la visibilidad del modal
  @Output() cerrar = new EventEmitter<void>(); // Evento para notificar cierre del modal

  buttonPosition: { left: number; bottom: number } | null = null; // Posición del botón

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.updateModalPosition();
  }

  limpiarFiltros() {
    console.log('Filtros limpiados');
    this.cerrar.emit(); // Notifica que se cierra el modal
  }

  aplicarFiltros() {
    console.log('Filtros aplicados');
    this.cerrar.emit(); // Notifica que se cierra el modal
  }

  cerrarModal() {
    this.cerrar.emit(); // Notifica que se cierra el modal
  }

  updateModalPosition() {
    const button = this.elementRef.nativeElement.querySelector('.open-modal-button');
    if (button) {
      const rect = button.getBoundingClientRect();
      this.buttonPosition = { left: rect.left, bottom: rect.bottom };
    } else {
      this.buttonPosition = null; // Explicita cuando no se encuentra el botón
    }
  }

}
