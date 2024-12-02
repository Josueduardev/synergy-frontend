import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { SolicitudesPage } from '../pages/solicitudes/solicitudes.page';
import { LoginPage } from '../pages/auth/login/login.page';
import { SharedComponent } from '../components/shared/shared.component';
import { SolicitudProntoPagoPage } from '../pages/landingpages/solicitud-prontopago/solicitud-prontopago.page';
import { AuthGuardApp } from '../guards/auth.guard';
import { PublicGuard } from '../guards/public.guard';
import { DetalleSolicitudPage } from '../pages/detalle-solicitud/detalle-solicitud.page';

export const routes: Routes = [
  {
    path: '', // Ruta privada
    component: SharedComponent,
    canActivate: [AuthGuardApp], // Aplica el guard
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'solicitudes',
        component: SolicitudesPage,
      },
      {
        path: 'solicitudes/detalle/:id',
        component: DetalleSolicitudPage,
      },
    ],
  },
  {
    path: 'login', // Ruta pública
    component: LoginPage,
    canActivate: [PublicGuard],
  },
  {
    path: 'solicitar-pronto-pago', // Ruta pública
    component: SolicitudProntoPagoPage,
  },
];
