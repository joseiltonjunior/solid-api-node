import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { FetchCustomerProfileUseCase } from '@/use-cases/customers/fetch-customer-profile'

export function makeFetchCustomerProfileUseCase() {
  const prismaCustomerRepository = new PrismaCustomersRepository()
  const fetchCustomerProfileUseCase = new FetchCustomerProfileUseCase(
    prismaCustomerRepository,
  )

  return fetchCustomerProfileUseCase
}
