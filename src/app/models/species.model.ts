import { Conservationstatus } from '../models/conservationstatus'

export interface Species {
    commonName: string;
    scientificName?: string;
    conservationstatus?: Conservationstatus;
}
