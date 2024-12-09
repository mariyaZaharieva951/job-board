import { provideRouter, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { JobBoardComponent } from './job-board/job-board.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: JobBoardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

export const appRouter = provideRouter(routes);
