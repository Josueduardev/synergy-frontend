import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { SolicitudesPage } from '../pages/solicitudes/solicitudes.page';
import { LoginPage } from '../pages/auth/login/login.page';
import { SharedComponent } from '../components/shared/shared.component';


export const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full' // Redirección predeterminada
      },
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'solicitudes',
        component: SolicitudesPage
      }
    ]
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: '**',
    redirectTo: 'home' // Ruta comodín para URLs no válidas
  }
];

