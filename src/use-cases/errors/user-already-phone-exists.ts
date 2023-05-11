export class UserAlreadyExistsPhoneError extends Error {
  constructor() {
    super('Phone already exists.')
  }
}
