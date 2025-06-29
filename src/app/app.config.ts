import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {authReducer} from './features/auth/store/auth.reducer';
import {AuthEffects} from './features/auth/store/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEffects([AuthEffects]),
    provideStore({auth: authReducer}),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
