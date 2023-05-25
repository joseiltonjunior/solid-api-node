export class AddressAlreadyExistsError extends Error {
  constructor() {
    super('Address already exists.')
  }
}
