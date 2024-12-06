import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRouter } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    appRouter, 
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));