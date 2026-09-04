import { BirdSightingData } from "../models/bird-sighting.model";
import { ValidationError } from "./validation-error";
import { Validator } from "./validator.interface";

export class SightingValidator implements Validator<BirdSightingData> {
    validate(data: BirdSightingData): void {
        const errors: string[] = [];

        if (!data.species?.commonName?.trim()) {
            errors.push('The common name of the species is required');
        }

        if (!data.observeAt) {
            errors.push('The date and time of the sighting are required.');
        } else if (data.observeAt.getTime() > Date.now()) {
            errors.push('The date of the sighting cant be in the future');
        }

        if (data.individualCount === undefined || data.individualCount === null) {
            errors.push('The number of individuals is required.');
        } else if (data.individualCount <= 0) {
            errors.push('The number of individuals must be greater than zero.');
        }

        if (!data.observer?.name?.trim()) {
            errors.push('The observers name is required.');
        }

        if (!data.location) {
            errors.push('Location is required.');
        } else if (data.location.type === 'location-coordinates') {
            const { latitude, longitude } = data.location.coordinates;
            if (latitude < -90 || latitude > 90) {
                errors.push('The latitude must be between -90 and 90.');
            }
            if (longitude < -180 || longitude > 180) {
                errors.push('The longitude must be between -180 and 180.');
            }
        }

        if (errors.length > 0) {
            throw new ValidationError(errors);
        }
    }
}
