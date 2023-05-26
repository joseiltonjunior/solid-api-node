import { CustomerRepository } from '@/repositories/customers-repository'

import { hash } from 'bcryptjs'
import { CustomerAlreadyExistsError } from '../errors/customer-already-exists-error'

import { Customer } from '@prisma/client'

interface registerCustomerRequest {
  name: string
  email: string
  password: string
  customerId: string
  phone: string
}

interface RegisterCustomerUseCaseResponse {
  user: Customer
}

export class RegisterCustomerUseCase {
  constructor(private userRepository: CustomerRepository) {}

  async execute({
    email,
    name,
    password,
    customerId,
    phone,
  }: registerCustomerRequest): Promise<RegisterCustomerUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)
    const userWithSamePhone = await this.userRepository.findByPhone(phone)
    const userWithSameCustomerId = await this.userRepository.findByCustomerId(
      customerId,
    )

    if (userWithSameEmail) {
      throw new CustomerAlreadyExistsError({ type: 'email' })
    }

    if (userWithSamePhone) {
      throw new CustomerAlreadyExistsError({ type: 'phone' })
    }

    if (userWithSameCustomerId) {
      throw new CustomerAlreadyExistsError({ type: 'customerId' })
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
      phone,
      customer_id: customerId,
    })

    return { user }
  }
}
