export class CustomerNotExistsError extends Error {
  constructor() {
    super('Customer not exists.')
  }
}
