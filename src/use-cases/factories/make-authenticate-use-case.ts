import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)

  return authenticateUseCase
}
