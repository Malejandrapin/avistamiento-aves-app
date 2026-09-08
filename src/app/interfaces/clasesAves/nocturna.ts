import { Aves } from '../interfacesMetodos/aves.interface';
import { Nocturno } from '../interfacesMetodos/visionNocturna';
import { Dormir } from '../interfacesMetodos/dormir-type';
import { HabitatType } from '../../models/habitat-type';
import { SightingLocation } from '../../models/location.model';
import { Observer } from '../../models/observer.model';
import { Species } from '../../models/species.model';

export class Nocturna implements Aves, Nocturno {
    constructor(
        public species: Species,
        public observeAt: Date,
        public location: SightingLocation,
        public individualCount: number,
        public observer: Observer,
        public habitat: HabitatType,
        public peso: number,
    ) {}

    comer(): void {}
    dormir(): Dormir { return 'cueva'; }
    comunicar(): void {}
    reproducir(): void {}
    activarVisionNocturna(): void {}
}