export class BikeAlreadyExists extends Error {
  public readonly name = 'BikeAlreadyExists'
  constructor() {
    super('Bik already exists')
  }
}