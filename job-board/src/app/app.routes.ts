import { provideRouter, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { JobBoardComponent } from './job-board/job-board.component';

const routes: Routes = [
  { path: '', component: JobBoardComponent },
  { path: 'register', component: RegisterComponent },
];

export const appRouter = provideRouter(routes);
