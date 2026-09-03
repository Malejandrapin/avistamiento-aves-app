export interface ReadableRepository<T> {
    getAll(): T[];
    getById(id: string): T | undefined;
}
