import { Component, Input, OnChanges, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BirdSighting } from '../../../models/bird-sighting.model';
import { SightingFilterCriteria } from '../../../interfaces/sighting-filter.interface';
import { SightingService } from '../../../services/sighting-service';

@Component({
  selector: 'app-sighting-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sighting-list.component.html',
  styleUrl: './sighting-list.component.scss',
})
export class SightingListComponent implements OnChanges {
  /** Se incrementa desde el padre cada vez que se registra un avistamiento nuevo. */
  @Input() refreshTrigger = 0;

  sightings: BirdSighting[] = [];

filterForm; 
  constructor(
    private readonly fb: FormBuilder,
    private readonly sightingService: SightingService
  ) {
 this.filterForm = this.fb.group({
    species: [''],
    observerName: [''],
    dateFrom: [''],
    dateTo: [''],
  });

    effect(() => {
      this.sightingService.changes();
      this.applyFilters();
    });

    this.applyFilters();
  }

  ngOnChanges(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const raw = this.filterForm.getRawValue();

    const criteria: SightingFilterCriteria = {
      species: raw.species || undefined,
      observerName: raw.observerName || undefined,
      dateFrom: raw.dateFrom ? new Date(raw.dateFrom) : undefined,
      dateTo: raw.dateTo ? new Date(raw.dateTo) : undefined,
    };

    this.sightings = this.sightingService.find(criteria);
  }

  remove(id: string): void {
    this.sightingService.remove(id);
    this.applyFilters();
  }
}
