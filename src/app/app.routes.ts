import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { SolicitudesPage } from '../pages/solicitudes/solicitudes.page';


export const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'solicitudes',
    component: SolicitudesPage
  },
];
