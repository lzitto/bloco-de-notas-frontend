import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // necessário para o [(ngModel)] do HTML
import { Router } from '@angular/router';     // serviço que troca de página via código

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],          // standalone: cada componente declara o que usa
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {               // era "Login" aqui e "LoginComponent" nas rotas
  // Estes campos ficam ligados aos <input> pelo [(ngModel)] (two-way binding).
  email = '';
  password = '';

  // Injeção de dependência: o Angular entrega o Router pronto.
  constructor(private router: Router) {}

  onLogin() {
    // Só avança se os dois campos estiverem preenchidos.
    if (this.email && this.password) {
      this.router.navigate(['/notes']);
    }
  }

  goToRegister() {
    // CORRIGIDO: era '/cadastro'. Precisa ser o mesmo "path" do app.routes.ts.
    this.router.navigate(['/register']);
  }
}