import { CustomerRepository } from '@/repositories/customers-repository'

import { CustomerAlreadyExistsError } from '../errors/customer-already-exists-error'

import { Customer } from '@prisma/client'

interface EditCustomerProfileRequest {
  name: string
  email: string
  id: number
  phone: string
}

interface EditCustomerProfileUseCaseResponse {
  user: Customer
}

export class EditCustomerProfileUseCase {
  constructor(private userRepository: CustomerRepository) {}

  async execute({
    email,
    name,
    id,
    phone,
  }: EditCustomerProfileRequest): Promise<EditCustomerProfileUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)
    const userWithSamePhone = await this.userRepository.findByPhone(phone)

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new CustomerAlreadyExistsError({ type: 'email' })
    }

    if (userWithSamePhone && userWithSamePhone.id !== id) {
      throw new CustomerAlreadyExistsError({ type: 'phone' })
    }

    const user = await this.userRepository.edit({
      name,
      email,
      phone,
      id,
    })

    return {
      user,
    }
  }
}
