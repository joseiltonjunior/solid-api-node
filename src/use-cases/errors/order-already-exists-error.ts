export class OrderAlreadyExistsError extends Error {
  constructor() {
    super('Order already exists.')
  }
}
