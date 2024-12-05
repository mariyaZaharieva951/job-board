import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = signal(false);
  private currentUser = signal<string | null>(null);
  private users = signal<{ email: string; password: string }[]>([]); 
  

  login(email: string, password: string): boolean {
    const user = this.users().find((u) => u.email === email && u.password === password);
    if (user) {
      this.loggedIn.set(true);
      this.currentUser.set(email);
      return true;
    }
    return false;
  }

  register(email: string, password: string): boolean {
    const existingUser = this.users().find((u) => u.email === email);
    if (existingUser) {
      return false; 
    }

    this.users.update((currentUsers) => [...currentUsers, { email, password }]);
    return true;
  }

  logout(): void {
    this.loggedIn.set(false);
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return this.loggedIn();
  }

  getUser() {
    return this.currentUser.asReadonly();
  }
}