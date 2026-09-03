export interface WritableRepository<T> {
    save(entity: T): T;
    delete(id: string): boolean;
}
