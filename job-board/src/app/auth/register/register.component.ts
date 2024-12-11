import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../validators/passwordMatchValidator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  error: string | null = null;
  success: string | null = null;


  constructor(private authService: AuthService, private fb:FormBuilder) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  
      username: ['', [Validators.required, Validators.minLength(3)]], 
      password: ['', [Validators.required, Validators.minLength(6)]],  
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator() } 
  );
  }

  

  onRegister() {
    
    if(this.registerForm.invalid) {
      return;
    }

    const { email, username, password } = this.registerForm.value;

    this.authService.register(email,username,password).subscribe({
      next: (response) => {
        if (response) {
          this.success = 'Registration successful!';
          this.registerForm.reset();
          //this.router.navigate(['/']);
        } else {
          this.error = 'Registration failed. Please try again!';
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'An error occurred during registration.';
        this.registerForm.reset();
      },
    });
  }
    
  
}
