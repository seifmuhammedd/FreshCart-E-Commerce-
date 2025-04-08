import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { reqHeaderInterceptor } from './core/interceptors/req-header.interceptor';
import { resErrorInterceptor } from './core/interceptors/res-error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([reqHeaderInterceptor, resErrorInterceptor])),
    provideToastr(),
  ],
};
