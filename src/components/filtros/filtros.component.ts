import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, CalendarModule],
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent {
  @Output() openAdvancedFilters: EventEmitter<void> = new EventEmitter<void>();

  onOpenAdvancedFilters() {
    this.openAdvancedFilters.emit();
  }
}
