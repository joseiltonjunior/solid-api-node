import { UsersRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

import { User } from '@prisma/client'
import { UserNotExistsError } from '../errors/user-not-exists'

interface EditProfileRequest {
  name: string
  email: string
  id: string
  phone: string
}

interface EditProfileUseCaseResponse {
  user: User
}

export class EditProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    id,
    phone,
  }: EditProfileRequest): Promise<EditProfileUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    const userWithSamePhone = await this.usersRepository.findByPhone(phone)
    const userNotExists = await this.usersRepository.findById(id)

    if (!userNotExists) {
      throw new UserNotExistsError()
    }

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new UserAlreadyExistsError({ type: 'email' })
    }

    if (userWithSamePhone && userWithSamePhone.id !== id) {
      throw new UserAlreadyExistsError({ type: 'phone' })
    }

    const user = await this.usersRepository.edit({
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
