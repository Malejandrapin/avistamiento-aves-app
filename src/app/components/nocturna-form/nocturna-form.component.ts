import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Conservationstatus } from '../../models/conservationstatus';
import { HabitatType } from '../../models/habitat-type';
import { SightingService } from '../../services/sighting-service';
import { ValidationError } from '../../validators/validation-error';
import { Nocturna } from '../../interfaces/clasesAves/nocturna';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-nocturna-form.component',
  styleUrl: './nocturna-form.component.scss',
  templateUrl: './nocturna-form.component.html',
})
export class NocturnaFormComponent {
    registered = output<Nocturna>();
  readonly conservationStatus = Object.values(Conservationstatus);
  readonly habitatType = Object.values(HabitatType);
  readonly behaviors = Object.getOwnPropertyNames(Nocturna.prototype)
    .filter((method) => method !== 'constructor');
  readonly nocturnaForm;
  errors: string[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sightingService: SightingService,
  ) {
    this.nocturnaForm = this.formBuilder.group({
      commonName: ['Nocturna', Validators.required],
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
      peso: [null as number | null, [Validators.required, Validators.min(0.001)]],
      notes: [''],
    });
  }

  submit(): void {
    this.errors = [];
    if (this.nocturnaForm.invalid) {
      this.nocturnaForm.markAllAsTouched();
      this.errors = ['Completa los campos obligatorios correctamente.'];
      return;
    }

    const raw = this.nocturnaForm.getRawValue();
    const observeAt = raw.observeAt ? new Date(raw.observeAt) : new Date(NaN);
    if (Number.isNaN(observeAt.getTime())) {
      this.errors = ['La fecha y hora del avistamiento no son válidas.'];
      return;
    }

    if (raw.locationType === 'coordinates') {
      const { latitude, longitude } = raw;
      if (
        latitude === null || longitude === null ||
        !Number.isFinite(latitude) || !Number.isFinite(longitude) ||
        latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180
      ) {
        this.errors = ['Ingresa coordenadas válidas: latitud entre -90 y 90 y longitud entre -180 y 180.'];
        return;
      }
    }

    const data = new Nocturna(
      {
        commonName: raw.commonName ?? '',
        scientificName: raw.scientificName || undefined,
        conservationstatus: (raw.conservationStatus as Conservationstatus) || undefined,
      },
      observeAt,
      raw.locationType === 'coordinates'
        ? {
          type: 'location-coordinates',
          coordinates: { latitude: raw.latitude ?? NaN, longitude: raw.longitude ?? NaN },
        }
        : { type: 'text', description: raw.locationDescription ?? '' },
      raw.individualCount ?? 0,
      { name: raw.observerName ?? '' },
      raw.habitatType as HabitatType,
      raw.peso ?? 0,
    );

    try {
      this.sightingService.register(data);
      this.resetForm();
      this.registered.emit(data);
    } catch (error) {
      this.errors = error instanceof ValidationError
        ? error.errors
        : ['Ocurrió un error inesperado al registrar el avistamiento.'];
    }
  }

  private resetForm(): void {
    this.nocturnaForm.reset({
      commonName: 'Aguila', scientificName: '', conservationStatus: '',
      observeAt: this.toLocalDateTimeInput(new Date()), locationType: 'text',
      locationDescription: '', latitude: null, longitude: null, individualCount: 1,
      observerName: '', habitatType: '', peso: null, notes: '',
    });
  }

  private toLocalDateTimeInput(date: Date): string {
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  }
}
