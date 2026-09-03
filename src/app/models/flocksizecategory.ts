export enum Flocksizecategory {
    Individual = 'INDIVIDUAL', //1 individuo
    Small = 'SMALL', //2-10
    Medium = 'MEDIUM', //11-50
    Large = 'LARGE', //50+

}
export function deriveFlockSize(individualCount: number): Flocksizecategory {
    if (individualCount === 1) return Flocksizecategory.Individual;
    if (individualCount <= 10) return Flocksizecategory.Small;
    if (individualCount <= 50) return Flocksizecategory.Medium;
    return Flocksizecategory.Large;

}