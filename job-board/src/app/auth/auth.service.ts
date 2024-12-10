import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'https://fakestoreapi.com/users'; //For test

  private loggedIn = signal(false);
  // private currentUser = signal<string | null>(null);
  // private users = signal<{ email: string; password: string }[]>([]); 

  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);


  constructor(private http: HttpClient) {}
  

  // login(email: string, password: string): boolean {
  //   const user = this.users().find((u) => u.email === email && u.password === password);
  //   if (user) {
  //     this.loggedIn.set(true);
  //     this.currentUser.set(email);
  //     return true;
  //   }
  //   return false;
  // }

  register(email: string, username:string, password: string) 
  //:boolean 
  {
    // const existingUser = this.users().find((u) => u.email === email);
    // if (existingUser) {
    //   return false; 
    // }

    // this.users.update((currentUsers) => [...currentUsers, { email, password }]);
    // return true;
    
    const body = {email, username, password}

    return this.http.post<User>('https://fakestoreapi.com/users', body).pipe(
      tap(response => {
        this._user.set(response)
        localStorage.setItem('token', response.token || '');
      }),
      catchError((err) => {
        console.error('Registration failed', err);
        return of(null);  
      })
    );
    
  }

  login(email: string, password: string) {
    const body = { email, password };

    return this.http.post<User>('https://fakestoreapi.com/auth/login', body).pipe(
      tap(response => {
        localStorage.setItem('token', response.token || '');
        this._user.set(response);
        this._token.set(response.token || ''); 
        return response; 
      }),
      catchError((err) => {
        console.error('Login failed', err);
        return of(null); 
      })
    );
  }

  logout(): void {
    this.loggedIn.set(false);
  }

  get user() {
    return this._user.asReadonly();
  }

  get currentUser() {
    return this._user;
  }

  get currentToken() {
    return this._token;
  }
}