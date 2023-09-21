export class RentDoesNotExist extends Error {
  public readonly name = 'RentDoesNotExist'
  constructor() {
    super('This rent does not exist')
  }
}