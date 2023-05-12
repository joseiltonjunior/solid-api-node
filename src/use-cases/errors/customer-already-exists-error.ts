interface CustomerAlreadyExistsProps {
  type: 'email' | 'phone' | 'customerId'
}

export class CustomerAlreadyExistsError extends Error {
  constructor({ type }: CustomerAlreadyExistsProps) {
    let message = ''
    switch (type) {
      case 'email':
        message = 'E-mail already exists.'
        break

      case 'phone':
        message = 'Phone already exists.'
        break

      case 'customerId':
        message = 'Customer ID already exists.'
        break

      default:
        message = 'Customer already exists.'
    }

    super(message)
  }
}
