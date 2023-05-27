import { UsersRepository } from '@/repositories/users-repository'

import { User } from '@prisma/client'

import { UserNotExistsError } from '../errors/user-not-exists'

interface FetchProfileUseCaseRequest {
  id: string
}

interface FetchProfileUseCaseResponse {
  user: User
}

export class FetchProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: FetchProfileUseCaseRequest): Promise<FetchProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserNotExistsError()
    }

    return {
      user,
    }
  }
}
