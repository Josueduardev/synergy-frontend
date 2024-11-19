import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/auth/login/login.page';
import { SharedComponent } from '../components/shared/shared.component';


export const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children:[
      {
        path:'home',
        component: HomePage
      }
    ]
  },
  {
    path: 'login',
    component: LoginPage
  }
];
