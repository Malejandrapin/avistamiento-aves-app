import { Inject, Injectable } from '@angular/core';
import { BirdSighting, BirdSightingData } from '../models/bird-sighting.model';
import { SightingFilterCriteria } from '../interfaces/sighting-filter.interface';
import { FilterBuilder } from '../utils/generic-filter.util';
import { SIGHTING_REPOSITORY } from '../interfaces/sightinh-repository.token';
import { SightingValidator } from '../validators/sighting-validator';
import { SightingRepository } from '../interfaces/sighting-repository.interface';

/**
 * Registro y consulta de avistamientos. No sabe CÓMO se
 * persisten los datos (depende de la abstracción SightingRepository, no de
 * una implementación concreta) ni valida los datos "a mano": delega en
 * SightingValidator. Cada clase tiene una única razón para cambiar (SRP).
 */
@Injectable({ providedIn: 'root' })
export class SightingService {
  private readonly sightingValidator = new SightingValidator();

  constructor(@Inject(SIGHTING_REPOSITORY) private readonly sightingRepository: SightingRepository) {}

  register(data: BirdSightingData): BirdSighting {
    this.sightingValidator.validate(data);
    const id = crypto.randomUUID();
    const sighting = new BirdSighting(id, data);
    return this.sightingRepository.save(sighting);
  }

  getAll(): BirdSighting[] {
    return this.sightingRepository.getAll();
  }

  remove(id: string): boolean {
    return this.sightingRepository.delete(id);
  }

  find(criteria: SightingFilterCriteria): BirdSighting[] {
    const builder = new FilterBuilder<BirdSighting>();

    if (criteria.species?.trim()) {
      const term = criteria.species.trim().toLowerCase();
      builder.add((sighting) => sighting.species.commonName.toLowerCase().includes(term));
    }

    if (criteria.observerName?.trim()) {
      const term = criteria.observerName.trim().toLowerCase();
      builder.add((sighting) => sighting.observer.name.toLowerCase().includes(term));
    }

    if (criteria.dateFrom) {
      const from = criteria.dateFrom;
      builder.add((sighting) => sighting.observeAt >= from);
    }

    if (criteria.dateTo) {
      const to = criteria.dateTo;
      builder.add((sighting) => sighting.observeAt <= to);
    }

    return builder.apply(this.sightingRepository.getAll());
  }
}
