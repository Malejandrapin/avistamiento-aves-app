import { ApplicationConfig } from '@angular/core';

import { SIGHTING_REPOSITORY } from './interfaces/sightinh-repository.token';
import { InMemorySightingRepository } from './repositories/in-memory-sighting-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: SIGHTING_REPOSITORY,
      useClass: InMemorySightingRepository
    }
  ]
};