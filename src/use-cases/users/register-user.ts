import { UsersRepository } from '@/repositories/users-repository'

import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

import { User } from '@prisma/client'

interface registerUserRequest {
  name: string
  email: string
  password: string
  customerId: string
  phone: string
  role?: 'CUSTOMER' | 'ADMIN'
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
    customerId,
    phone,
    role = 'CUSTOMER',
  }: registerUserRequest): Promise<RegisterUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    const userWithSamePhone = await this.usersRepository.findByPhone(phone)
    const userWithSameCustomerId = await this.usersRepository.findByCustomerId(
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

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      phone,
      customer_id: customerId,
      role,
    })

    return { user }
  }
}
