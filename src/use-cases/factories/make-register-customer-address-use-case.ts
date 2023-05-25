import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { RegisterCustomerAddressUseCase } from '../register-customer-address'

export function makeRegisterCustomerAddressUseCase() {
  const prismaCustomerRepository = new PrismaAddressesRepository()
  const registerCustomerUseCase = new RegisterCustomerAddressUseCase(
    prismaCustomerRepository,
  )

  return registerCustomerUseCase
}
