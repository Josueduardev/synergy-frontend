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
import { Email } from '../../../utility/global.util';
import { MessageService } from 'primeng/api';

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
    InputTextModule,
  ],
  providers: [SynergyProvider, LocalStorageProvider],
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isFormInvalid = false;
  messageError = '';

  constructor(
    private synergyProvider: SynergyProvider,
    private storeProv: LocalStorageProvider,
    private router: Router,
    private messageService: MessageService,
  ) { }

  async login() {
    if (!this.email || !this.password || !this.isValidEmail(this.email)) {
      this.isFormInvalid = true;
      return;
    }

    this.isFormInvalid = false;
    try {
      const resp = await this.synergyProvider.login(this.email, this.password);

      if (resp) {
        console.log(resp)
        this.storeProv.jwtSession = resp.data.access_token; // Guarda el token
        this.storeProv.userNameSession = resp.data.usuario.name;
        this.storeProv.userIDSession = resp.data.usuario.id.toString();
        this.messageService.add({ severity: 'success', summary: 'Inicio de sesión', detail: 'Has iniciado sesión exitosamente' });
        this.router.navigate(['/home']); // Redirige al home
      }
    } catch (error: any) {
        this.messageError = error.message;
    }


  }

  isValidEmail(email: string): boolean {
    return Email.isValid(email);
  }
}
