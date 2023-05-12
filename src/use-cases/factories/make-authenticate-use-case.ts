import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaCustomerRepository = new PrismaCustomersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaCustomerRepository)

  return authenticateUseCase
}
