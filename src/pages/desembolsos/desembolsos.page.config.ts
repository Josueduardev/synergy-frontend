import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './desembolsos.page.route';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideAnimations()]
};
