import { deriveFlockSize, Flocksizecategory } from "./flocksizecategory";
import { HabitatType } from "./habitat-type";
import { SightingLocation } from "./location.model";
import { Observer } from "./observer.model";
import { Species } from "./species.model";

export interface BirdSightingData {
    id?: string;
    species: Species;
    observeAt: Date;
    location: SightingLocation;
    individualCount: number;
    observer: Observer;
    habitat?: HabitatType;
    notes?: string;
}

export class BirdSighting {
    private readonly _id: string;
    private readonly _species: Species;
    private readonly _observeAt: Date;
    private readonly _location: SightingLocation;
    private readonly _individualCount: number;
    private readonly _observer: Observer;
    private readonly _habitat?: HabitatType;
    private readonly _notes?: string;

    constructor(id: string, data: BirdSightingData) {
        this._id = id;
        this._species = data.species;
        this._observeAt = data.observeAt;
        this._location = data.location;
        this._individualCount = data.individualCount;
        this._observer = data.observer;
        this._habitat = data.habitat;
        this._notes = data.notes;
    }
    
    get id(): string { return this._id; }
    get species(): Species { return this._species; }
    get observeAt(): Date { return this._observeAt; }
    get location(): SightingLocation { return this._location; }
    get individualCount(): number { return this._individualCount; }
    get observer(): Observer { return this._observer; }
    get habitat(): HabitatType | undefined { return this._habitat; }
    get notes(): string | undefined { return this._notes; }

    get flockSize(): Flocksizecategory {
        return deriveFlockSize(this._individualCount)
    }
 
}
