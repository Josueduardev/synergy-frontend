import { Component, OnInit } from '@angular/core';
import { HttpProvider } from '../../../providers/http.provider';
import { LocalStorageProvider } from '../../../providers/local-storage.provider';
import { Router } from '@angular/router';
import { SynergyProvider } from '../../../providers/synergy.provider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CheckboxModule,
    ButtonModule,
    PasswordModule,
    InputTextModule

  ],
  providers: [SynergyProvider, LocalStorageProvider],
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
      private synergyProvider: SynergyProvider,
      private storeProv: LocalStorageProvider,
      private router: Router
  ) {}

  login() {
    this.synergyProvider.login(this.email,this.password).then(
      (resp)=>{
        if(resp){
          this.storeProv.jwtSession = resp.data.token; // Guarda el token
          this.storeProv.userNameSession = resp.data.nombre_completo; 
          this.storeProv.userIDSession = resp.data.usuario_id.toString(); 
          this.router.navigate(['/home']); // Redirige al home
        }
      },
      (err)=>{
        console.log(err)
        alert("Error al iniciar session");
      }
    )
  }
}