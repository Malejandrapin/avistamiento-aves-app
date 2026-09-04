export type FilterPredicate<T> = (item: T) => boolean;


// construir y aplicar una lista de filtros dinamicos, sirve para acumular diferentes condiciones (filtros)
// de forma ordenada y posteriormente aplicarlas todas juntas a una lista de datos

export class FilterBuilder<T> {
    private readonly predicates: FilterPredicate<T>[] = [];

    add(predicate: FilterPredicate<T> | null | undefined): this {
        if (predicate) { this.predicates.push(predicate); }
        return this;
    }

    apply(items: T[]): T[] {
        return items.filter((item) => this.predicates.every((predicate) => predicate(item)));
    }
}
