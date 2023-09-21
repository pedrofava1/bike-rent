export class UserAlreadyExists extends Error {
  public readonly name = 'UserAlreadyExists'
  constructor() {
    super('User already exists.')
  }
}