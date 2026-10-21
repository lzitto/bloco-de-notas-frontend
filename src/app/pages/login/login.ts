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
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
})
export class Login implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  hidePassword = signal(true);
  loading = signal(false);
  error = signal('');

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/notes'], { replaceUrl: true });
    }
  }

  async onLogin(): Promise<void> {
    this.error.set('');
    this.loading.set(true);
    try {
      await this.auth.login(this.email(), this.password());
      await this.router.navigate(['/notes'], { replaceUrl: true });
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Não foi possível entrar.');
    } finally {
      this.loading.set(false);
    }
  }
}