import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Notes } from './pages/notes/notes';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [guestGuard], title: 'Entrar' },
  { path: 'register', component: Register, canActivate: [guestGuard], title: 'Criar conta' },
  { path: 'notes', component: Notes, canActivate: [authGuard], title: 'Minhas notas' },
  { path: '**', redirectTo: 'notes' },
];
