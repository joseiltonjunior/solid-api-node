import { UserRepository } from '@/repositories/users-repository'

import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

import { User } from '@prisma/client'

interface registerProps {
  name: string
  email: string
  password: string
  customerId: string
  phone: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
    customerId,
    phone,
  }: registerProps): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)
    const userWithSamePhone = await this.userRepository.findByPhone(phone)
    const userWithSameCustomerId = await this.userRepository.findByCustomerId(
      customerId,
    )

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError({ type: 'email' })
    }

    if (userWithSamePhone) {
      throw new UserAlreadyExistsError({ type: 'phone' })
    }

    if (userWithSameCustomerId) {
      throw new UserAlreadyExistsError({ type: 'customerId' })
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
