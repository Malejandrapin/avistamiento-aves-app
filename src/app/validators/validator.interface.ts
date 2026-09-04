export interface Validator<T> {
    validate(data: T): void;//va a lanzar ValidationError si los datos son invalidos
}
