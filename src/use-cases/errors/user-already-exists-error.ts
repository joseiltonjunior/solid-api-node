export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail or ID already exists.')
  }
}
