import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { RegisterCustomerAddressUseCase } from '../register-customer-address'

export function makeRegisterCustomerAddressUseCase() {
  const prismaCustomerAddressRepository = new PrismaAddressesRepository()
  const registerCustomerAddressUseCase = new RegisterCustomerAddressUseCase(
    prismaCustomerAddressRepository,
  )

  return registerCustomerAddressUseCase
}
