export class NoOrderCustomerError extends Error {
  constructor() {
    super('No orders for this customer.')
  }
}
