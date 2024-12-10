import { Component, signal } from '@angular/core';
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
  username = '';
  password = '';
  confirmPassword = '';
  error: string | null = null;
  success: string | null = null;


  constructor(private authService: AuthService) {}

  onRegister() {
    
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match!';
      return;
    }

    this.authService.register(this.email, this.username, this.password).subscribe({
      next: (response) => {
        if (response) {
          this.success = 'Registration successful!';
          
          //this.router.navigate(['/']);
        } else {
          this.error = 'Registration failed. Please try again!';
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'An error occurred during registration.';
      },
    });
  }
    
  
}
