import { Injectable } from '@angular/core';
import { BirdSighting } from '../models/bird-sighting.model';

export interface SpeciesCount {
  species: string;
  count: number;
}

/**
 * Responsabilidad única: calcular estadísticas a partir de una lista de
 * avistamientos. No registra, no valida, no persiste (SRP).
 */
@Injectable({ providedIn: 'root' })
export class StatisticsService {
  countBySpecies(sightings: BirdSighting[]): SpeciesCount[] {
    const counts = new Map<string, number>();

    for (const sighting of sightings) {
      const key = sighting.species.commonName;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return Array.from(counts, ([species, count]) => ({ species, count })).sort(
      (a, b) => b.count - a.count
    );
  }

  mostSightedSpecies(sightings: BirdSighting[]): SpeciesCount | undefined {
    return this.countBySpecies(sightings)[0];
  }

  totalIndividuals(sightings: BirdSighting[], from?: Date, to?: Date): number {
    return sightings
      .filter((sighting) => (!from || sighting.observeAt >= from) && (!to || sighting.observeAt <= to))
      .reduce((sum, sighting) => sum + sighting.individualCount, 0);
  }
}
