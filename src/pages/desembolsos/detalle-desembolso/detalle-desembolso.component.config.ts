import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './detalle-desembolso.component.routes';

export const detalleDesembolsoConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideAnimations()]
};
