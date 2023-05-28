import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FetchManyUsersUseCase } from '@/use-cases/users/fetch-many-users'

export function makeFetchManyUsers() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const fetchManyUsersProfileUseCase = new FetchManyUsersUseCase(
    prismaUsersRepository,
  )

  return fetchManyUsersProfileUseCase
}
