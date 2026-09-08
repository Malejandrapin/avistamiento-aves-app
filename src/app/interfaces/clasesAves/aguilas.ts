import { Aves } from '../interfacesMetodos/aves.interface';
import { Cazador } from '../interfacesMetodos/cazar.interface';
import { Volador } from '../interfacesMetodos/volar.interface';
import { Dormir } from '../interfacesMetodos/dormir-type';
import { HabitatType } from '../../models/habitat-type';
import { SightingLocation } from '../../models/location.model';
import { Observer } from '../../models/observer.model';
import { Species } from '../../models/species.model';

export class Aguilas implements Aves, Volador, Cazador {
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
    dormir(): Dormir { return 'nido'; }
    comunicar(): void {}
    reproducir(): void {}
    volar(): void {}
    cazar(): void {}
}