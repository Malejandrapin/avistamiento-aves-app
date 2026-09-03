import { InMemorySightingRepository } from './in-memory-sighting-repository';

describe('InMemorySightingRepository', () => {
  it('should create an instance', () => {
    expect(new InMemorySightingRepository()).toBeTruthy();
  });
});
