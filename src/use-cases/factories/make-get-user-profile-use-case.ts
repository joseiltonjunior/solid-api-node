import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetProfileUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const getProfileUseCase = new GetUserProfileUseCase(prismaUserRepository)

  return getProfileUseCase
}
