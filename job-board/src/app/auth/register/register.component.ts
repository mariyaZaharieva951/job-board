import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  email = '';
  password = '';
  confirmPassword = '';
  error: string | null = null;

  constructor(private authService: AuthService) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match!';
      return;
    }

    const success = this.authService.register(this.email, this.password);
    if (!success) {
      this.error = 'Registration failed! Email might already be in use.';
    }
  }
}
