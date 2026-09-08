import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { SIGHTING_REPOSITORY } from './interfaces/sightinh-repository.token';
import { InMemorySightingRepository } from './repositories/in-memory-sighting-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: SIGHTING_REPOSITORY,
      useClass: InMemorySightingRepository
    }
  ]
};