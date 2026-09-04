import { Component, Input, OnChanges } from '@angular/core';
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
export class StatisticsPanelComponent implements OnChanges {
  @Input() refreshTrigger = 0;

  countsBySpecies: SpeciesCount[] = [];
  mostSighted?: SpeciesCount;
  totalIndividuals = 0;

  constructor(
    private readonly sightingService: SightingService,
    private readonly statisticsService: StatisticsService
  ) {
    this.recompute();
  }

  ngOnChanges(): void {
    this.recompute();
  }

  private recompute(): void {
    const sightings = this.sightingService.getAll();
    this.countsBySpecies = this.statisticsService.countBySpecies(sightings);
    this.mostSighted = this.statisticsService.mostSightedSpecies(sightings);
    this.totalIndividuals = this.statisticsService.totalIndividuals(sightings);
  }
}
