import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { FetchCustomerProfileUseCase } from '../fetch-customer-profile'

export function makeFetchCustomerProfileUseCase() {
  const prismaCustomerRepository = new PrismaCustomersRepository()
  const fetchCustomerProfileUseCase = new FetchCustomerProfileUseCase(
    prismaCustomerRepository,
  )

  return fetchCustomerProfileUseCase
}
