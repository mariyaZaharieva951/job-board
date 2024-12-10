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
  success: string | null = null;

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response) {
          this.success = 'Login successful!';
          
          //this.router.navigate(['/']);
        } else {
          this.error = 'Login failed. Please try again!';
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'An error occurred during login.';
      },
    });
  }
}
