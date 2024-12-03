import { Component, OnInit } from '@angular/core';
import { FiltrosPanelComponent } from '../../components/filtros/filtros-panel/filtros-panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FiltrosPanelComponent, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  totalSolicitudes: number = 0;
  aprobadas: number = 0;
  sinAprobar: number = 0;

  constructor() {}

  ngOnInit() {
    this.initializeData();
  }

  /**
   * Initializes data with default values.
   * Prepares to fetch data from an endpoint when available.
   */
  private initializeData(): void {
    // Default values
    this.totalSolicitudes = 55;
    this.aprobadas = 46;
    this.sinAprobar = 9;

    // Simulate fetching data from an API in the future
    // Uncomment the following when the endpoint is ready
    /*
    this.fetchDataFromAPI();
    */
  }

  /**
   * Fetch data from an endpoint (mock implementation for now).
   */
  private fetchDataFromAPI(): void {
    // Replace with actual service/API call
    // Example:
    /*
    this.apiService.getSolicitudesData().subscribe(data => {
      this.totalSolicitudes = data.total;
      this.aprobadas = data.approved;
      this.sinAprobar = data.pending;
    });
    */
    console.log('Fetching data from API...');
  }
}
