import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SightingService } from '../../../services/sighting-service';
import { SpeciesCount, StatisticsService } from '../../../services/statistics-service';

@Component({
  selector: 'app-statistics-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics-panel.component.html',
  styleUrl: './statistics-panel.component.scss',
})
export class StatisticsPanelComponent {
  @Input() refreshTrigger = 0;

  readonly statistics = computed(() => {
    this.sightingService.changes();
    const sightings = this.sightingService.getAll();

    return {
      countsBySpecies: this.statisticsService.countBySpecies(sightings),
      mostSighted: this.statisticsService.mostSightedSpecies(sightings),
      totalIndividuals: this.statisticsService.totalIndividuals(sightings),
    };
  });

  constructor(
    private readonly sightingService: SightingService,
    private readonly statisticsService: StatisticsService
  ) {}
}
