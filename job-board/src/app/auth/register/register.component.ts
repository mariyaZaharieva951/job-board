import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [],
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
