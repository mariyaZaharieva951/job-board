import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup; 

  error: string | null = null;
  success: string | null = null;

  constructor(private authService: AuthService, private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;  
    }
    const { email, username, password } = this.loginForm.value;
    this.authService.login(email, username, password).subscribe({
      next: (response) => {
        if (response) {
          this.success = 'Login successful!';
          this.loginForm.reset();
          //this.router.navigate(['/']);
        } else {
          this.error = 'Login failed. Please try again!';
        }
      },
      error: (err) => {
        console.error(err);
        this.loginForm.reset();
        this.error = 'An error occurred during login.';
        
      },
    });
  }
}
