import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { JobBoardComponent } from './app/job-board/job-board.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 

const routes = [
  { path: '', component: JobBoardComponent },  
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  
    provideHttpClient(withInterceptorsFromDi())
  ],
}).catch((err) => console.error(err));