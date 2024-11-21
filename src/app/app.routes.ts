import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { SolicitudesPage } from '../pages/solicitudes/solicitudes.page';
import { LoginPage } from '../pages/auth/login/login.page';
import { SharedComponent } from '../components/shared/shared.component';
import { SolicitudProntoPagoPage } from '../pages/landingpages/solicitud-prontopago/solicitud-prontopago.page';


export const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children:[
      {
        path:'home',
        component: HomePage
      },
      {
        path: 'solicitudes',
        component: SolicitudesPage
      },
    ]
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'landing',
    component: SolicitudProntoPagoPage
  },
];
