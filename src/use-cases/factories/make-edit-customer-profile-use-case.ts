import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { EditCustomerProfileUseCase } from '@/use-cases/customers/edit-customer-profile'

export function makeEditCustomerProfileUseCase() {
  const prismaCustomerRepository = new PrismaCustomersRepository()
  const editCustomerProfileUseCase = new EditCustomerProfileUseCase(
    prismaCustomerRepository,
  )

  return editCustomerProfileUseCase
}
