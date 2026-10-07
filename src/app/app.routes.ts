import { Routes } from '@angular/router';
// Os nomes entre chaves precisam ser IGUAIS ao "export class" de cada arquivo.
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Notes } from './pages/notes/notes';

export const routes: Routes = [
  // Quem abre o site na raiz ("") é mandado para o login.
  // pathMatch 'full' = só redireciona se o caminho for EXATAMENTE vazio.
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // path = o que aparece na URL; component = a tela mostrada no <router-outlet>.
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'notes', component: Notes },

  // Qualquer URL desconhecida volta para o login.
  { path: '**', redirectTo: 'login' }
];