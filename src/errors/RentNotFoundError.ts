export class RentNotFoundError extends Error {
  public readonly name = 'RentNotFoundError'
  constructor() {
    super('This rent does not exist')
  }
}