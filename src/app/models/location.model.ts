export interface Location {
    readonly latitude: number;
    readonly longitude: number;
}

export type SightingLocation = | { type: 'text'; description: string } | { type: 'location-coordinates'; coordinates: Location };