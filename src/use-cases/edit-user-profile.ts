import { UserRepository } from '@/repositories/users-repository'

import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
// import { hash } from 'bcryptjs'

interface EditUserProfileUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
  id: string
}

interface EditUserProfileUseCaseResponse {
  user: User
}

export class EditUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    id,
    name,
    password,
  }: EditUserProfileUseCaseRequest): Promise<EditUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    // const password_hash = await hash(password, 6)

    // const newData = await this.userRepository.create({
    //   name,
    //   email,
    //   password_hash,
    //   id,
    // })

    return {
      user,
    }
  }
}
