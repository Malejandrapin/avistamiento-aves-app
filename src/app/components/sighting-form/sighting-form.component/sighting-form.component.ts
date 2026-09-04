import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BirdSightingData } from '../../../models/bird-sighting.model';
import { Conservationstatus } from '../../../models/conservationstatus';
import { SightingService } from '../../../services/sighting-service';
import { ValidationError } from '../../../validators/validation-error';
import { HabitatType } from '../../../models/habitat-type';

@Component({
  selector: 'app-sighting-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sighting-form.component.html',
  styleUrl: './sighting-form.component.scss',
})
export class SightingFormComponent {
  registered = output<BirdSightingData>();

  readonly conservationStatus = Object.values(Conservationstatus);
  readonly habitatType = Object.values(HabitatType);
  errors: string[] = [];

  readonly sightingForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sightingService: SightingService
  ) {
     this.sightingForm = this.formBuilder.group({
    commonName: ['', Validators.required],
    scientificName: [''],
    conservationStatus: ['', Validators.required],
    observeAt: [this.toLocalDateTimeInput(new Date()), Validators.required],
    locationType: ['text' as 'text' | 'coordinates', Validators.required],
    locationDescription: [''],
    latitude: [null as number | null],
    longitude: [null as number | null],
    individualCount: [1, [Validators.required, Validators.min(1)]],
    observerName: ['', Validators.required],
    habitatType: ['', Validators.required],
    notes: [''],
  });
  }

  submit(): void {
    this.errors = [];

    if (this.sightingForm.invalid) {
      this.sightingForm.markAllAsTouched();
      this.errors = ['Completa los campos obligatorios correctamente.'];
      return;
    }

    const raw = this.sightingForm.getRawValue();
    const observeAt = raw.observeAt ? new Date(raw.observeAt) : new Date(NaN);

    if (Number.isNaN(observeAt.getTime())) {
      this.errors = ['La fecha y hora del avistamiento no son válidas.'];
      return;
    }

    if (raw.locationType === 'coordinates') {
      const latitude = raw.latitude;
      const longitude = raw.longitude;

      if (
        latitude === null ||
        longitude === null ||
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
      ) {
        this.errors = ['Ingresa coordenadas válidas: latitud entre -90 y 90 y longitud entre -180 y 180.'];
        return;
      }
    }

    const data: BirdSightingData = {
      species: {
        commonName: raw.commonName ?? '',
        scientificName: raw.scientificName || undefined,
        conservationstatus: (raw.conservationStatus as Conservationstatus) || undefined,
      },
      observeAt,
      location:
        raw.locationType === 'coordinates'
          ? {
              type: 'location-coordinates',
              coordinates: {
                latitude: raw.latitude ?? NaN,
                longitude: raw.longitude ?? NaN,
              },
            }
          : { type: 'text', description: raw.locationDescription ?? '' },
      individualCount: raw.individualCount ?? 0,
      observer: { name: raw.observerName ?? '' },
      habitat: (raw.habitatType as HabitatType) || undefined,
      notes: raw.notes || undefined,
    };

    try {
      this.sightingService.register(data);
      this.resetForm();
      this.registered.emit(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        this.errors = error.errors;
      } else {
        this.errors = ['Ocurrió un error inesperado al registrar el avistamiento.'];
      }
    }
  }

  private resetForm(): void {
    this.sightingForm.reset({
      commonName: '',
      scientificName: '',
      conservationStatus: '',
      observeAt: this.toLocalDateTimeInput(new Date()),
      locationType: 'text',
      locationDescription: '',
      latitude: null,
      longitude: null,
      individualCount: 1,
      observerName: '',
      habitatType: '',
      notes: '',
    });
  }

  private toLocalDateTimeInput(date: Date): string {
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  }
}
