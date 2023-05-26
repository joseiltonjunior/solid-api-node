import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { EditCustomerAddressUseCase } from '@/use-cases/addresses/edit-customer-address'

export function makeEditCustomerAddressUseCase() {
  const prismaCustomerAddressRepository = new PrismaAddressesRepository()
  const editCustomerAddressUseCase = new EditCustomerAddressUseCase(
    prismaCustomerAddressRepository,
  )

  return editCustomerAddressUseCase
}
