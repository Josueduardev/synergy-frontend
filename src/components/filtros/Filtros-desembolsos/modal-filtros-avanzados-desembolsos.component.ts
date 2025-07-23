import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-filtros-avanzados-desembolsos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-filtros-avanzados-desembolsos.component.html',
  styleUrls: ['./modal-filtros-avanzados-desembolsos.component.scss'],
})
export class ModalFiltrosAvanzadosDesembolsosComponent implements AfterViewInit {
  @Input() mostrar = false; // Controla la visibilidad del modal
  @Output() cerrar = new EventEmitter<any>(); // Evento para notificar cierre del modal

  buttonPosition: { left: number; bottom: number } | null = null; // Posición del botón

  filtros = {
    razon_social: null,
    correo_electronico: null,
    nrc: null,
    nombre_cliente: null,
    telefono: null
  }

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.updateModalPosition();
  }

  limpiarFiltros() {
    console.log('Filtros limpiados');
    this.filtros = {
      razon_social: null,
      correo_electronico: null,
      nrc: null,
      nombre_cliente: null,
      telefono: null
    }
    this.cerrar.emit({}); // Notifica que se cierra el modal
  }

  aplicarFiltros() {
    // Filtrar solo las propiedades que no son null o undefined
    const filtrosAplicados = Object.fromEntries(
      Object.entries(this.filtros).filter(([_, value]) => value !== null && value !== undefined)
    );
    this.cerrar.emit(filtrosAplicados); // ✅ Emite los filtros no nulos

    console.log('Filtros aplicados: ', filtrosAplicados);
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
