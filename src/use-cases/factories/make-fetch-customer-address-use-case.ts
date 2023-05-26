import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { FetchCustomerAddressUseCase } from '../fetch-customer-address'

export function makeFetchCustomerAddressUseCase() {
  const prismaCustomerRepository = new PrismaAddressesRepository()
  const fetchCustomerAddressUseCase = new FetchCustomerAddressUseCase(
    prismaCustomerRepository,
  )

  return fetchCustomerAddressUseCase
}
