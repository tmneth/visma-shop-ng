import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideRouter(APP_ROUTES)],
});
