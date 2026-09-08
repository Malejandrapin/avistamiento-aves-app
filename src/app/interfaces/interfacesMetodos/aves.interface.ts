import { Dormir } from './dormir-type';
import { HabitatType } from '../../models/habitat-type';
import { SightingLocation } from '../../models/location.model';
import { Observer } from '../../models/observer.model';
import { Species } from '../../models/species.model';

export interface Aves {
    species: Species;
    observeAt: Date;
    location: SightingLocation;
    individualCount: number;
    observer: Observer;
    habitat: HabitatType;
    peso: number;
    comer(): void;
    dormir(): Dormir;
    comunicar(): void;
    reproducir(): void;
}