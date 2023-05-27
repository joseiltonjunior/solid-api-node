import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FetchProfileUseCase } from '@/use-cases/users/fetch-profile'

export function makeFetchUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const fetchUserProfileUseCase = new FetchProfileUseCase(prismaUsersRepository)

  return fetchUserProfileUseCase
}
