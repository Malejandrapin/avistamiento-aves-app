import { BirdSighting } from '../models/bird-sighting.model';
import { StatisticsService } from './statistics-service'

describe('StatisticsService', () => {
  const statisticsService = new StatisticsService();

  function makeSighting(species: string, count: number, date = new Date('2024-01-01')): BirdSighting {
    return new BirdSighting(crypto.randomUUID(), {
      species: { commonName: species },
      observeAt: date,
      location: { type: 'text', description: 'x' },
      individualCount: count,
      observer: { name: 'obs' },
    });
  }

  it('cuenta avistamientos por especie', () => {
    const sightings = [makeSighting('Colibrí', 1), makeSighting('Colibrí', 2), makeSighting('Águila', 1)];
    const counts = statisticsService.countBySpecies(sightings);
    expect(counts[0]).toEqual({ species: 'Colibrí', count: 2 });
  });

  it('identifica la especie más avistada', () => {
    const sightings = [makeSighting('Colibrí', 1), makeSighting('Colibrí', 1), makeSighting('Águila', 1)];
    expect(statisticsService.mostSightedSpecies(sightings)?.species).toBe('Colibrí');
  });

  it('suma el total de individuos observados', () => {
    const sightings = [makeSighting('Colibrí', 3), makeSighting('Águila', 2)];
    expect(statisticsService.totalIndividuals(sightings)).toBe(5);
  });
});
