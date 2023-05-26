import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { AuthenticateUseCase } from '@/use-cases/customers/authenticate'

export function makeAuthenticateUseCase() {
  const prismaCustomerRepository = new PrismaCustomersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaCustomerRepository)

  return authenticateUseCase
}
