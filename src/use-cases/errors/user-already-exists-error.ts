interface UserAlreadyExistsProps {
  type: 'email' | 'phone' | 'customerId'
}

export class UserAlreadyExistsError extends Error {
  constructor({ type }: UserAlreadyExistsProps) {
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
        message = 'User already exists.'
    }

    super(message)
  }
}
