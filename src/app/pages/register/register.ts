import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {   // antes: RegisterComponent
  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  onRegister() {
    if (this.name && this.email && this.password) {
      this.router.navigate(['/notes']);
    }
  }
}