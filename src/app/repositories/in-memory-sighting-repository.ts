import { Injectable } from "@angular/core";
import { SightingRepository } from "../interfaces/sighting-repository.interface";
import { BirdSighting } from "../models/bird-sighting.model";

@Injectable({ providedIn: 'root' })
export class InMemorySightingRepository implements SightingRepository {
    private sightings: BirdSighting[] = [];

    getAll(): BirdSighting[] {
        return [...this.sightings];
    }

    getById(id: string): BirdSighting | undefined {
        return this.sightings.find((sighting) => sighting.id === id);
    }

    save(item: BirdSighting): BirdSighting {
        this.sightings.push(item);
        return item;
    }

    delete(id: string): boolean {
        const index = this.sightings.findIndex((sighting) => sighting.id === id);
        if (index === -1) {
            return false;
        }
        this.sightings.splice(index, 1);
        return true;
    }
}
