import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register.html',
})
export class Register implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  hidePassword = signal(true);
  loading = signal(false);
  error = signal('');

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/notes']);
    }
  }

  async onRegister(): Promise<void> {
    this.error.set('');

    if (this.password() !== this.confirmPassword()) {
      this.error.set('As senhas não conferem.');
      return;
    }

    this.loading.set(true);
    try {
      await this.auth.register(this.email(), this.password());
      await this.router.navigate(['/notes']);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Não foi possível criar a conta.');
    } finally {
      this.loading.set(false);
    }
  }
}