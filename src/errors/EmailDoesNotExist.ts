export class EmailDoesNotExist extends Error {
  public readonly name = 'EmailDoesNotExist'
  constructor() {
    super('This email is not registered')
  }
}