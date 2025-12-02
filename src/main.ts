// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { FakeBackendInterceptor } from './app/backend/fake-backend.service';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { appConfig } from './app/app.config';
// import { fakeBackendInterceptor } from './app/fake-backend.interceptor';

// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     provideHttpClient(withInterceptors([fakeBackendInterceptor]))
//   ]
// }).catch(err => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { fakeBackendInterceptor } from './app/fake-backend.interceptor';

// If you have additional appConfig, spread it here
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes), // <-- standalone routing
    provideHttpClient(withInterceptors([fakeBackendInterceptor]))
  ]
}).catch(err => console.error(err));

