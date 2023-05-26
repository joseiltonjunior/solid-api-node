import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { RegisterCustomerUseCase } from '@/use-cases/customers/register-customer'

export function makeRegisterCustomerUseCase() {
  const prismaCustomerRepository = new PrismaCustomersRepository()
  const registerCustomerUseCase = new RegisterCustomerUseCase(
    prismaCustomerRepository,
  )

  return registerCustomerUseCase
}
