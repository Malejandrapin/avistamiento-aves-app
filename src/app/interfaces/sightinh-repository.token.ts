import { InjectionToken } from '@angular/core';
import { SightingRepository } from "../interfaces/sighting-repository.interface";

export const SIGHTING_REPOSITORY = new InjectionToken<SightingRepository>('SIGHTING_REPOSITORY');