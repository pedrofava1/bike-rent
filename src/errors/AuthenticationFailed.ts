export class AuthenticationFailed extends Error{
  public readonly name = 'AuthenticantionFailed'
  constructor() {
    super('Authentication failed.')
  }
}