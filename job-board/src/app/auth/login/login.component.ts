import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private authService: AuthService) {}

  // onLogin() {
  //   const success = this.authService.login(this.email, this.password);
  //   if (!success) {
  //     this.error = 'Invalid email or password!';
  //   }
  // }
}
