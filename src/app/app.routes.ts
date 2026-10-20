import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Notes } from './pages/notes/notes';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'login', component: Login, title: 'Entrar' },
  { path: 'register', component: Register, title: 'Criar conta' },
  { path: 'notes', component: Notes, title: 'Minhas notas' },
  { path: '**', redirectTo: 'notes' },
];
