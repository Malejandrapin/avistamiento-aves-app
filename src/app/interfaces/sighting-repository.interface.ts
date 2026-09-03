import { BirdSighting } from "../models/bird-sighting.model";
import { ReadableRepository } from "./readable-repository.interface";
import { WritableRepository } from "./writable-repository.interface";

export interface SightingRepository extends ReadableRepository<BirdSighting>, WritableRepository<BirdSighting> { }
