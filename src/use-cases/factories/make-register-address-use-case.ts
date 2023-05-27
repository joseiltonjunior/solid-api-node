import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { RegisterAddressUseCase } from '@/use-cases/addresses/register-address'

export function makeRegisterAddressUseCase() {
  const prismaAddressRepository = new PrismaAddressesRepository()
  const registerAddressUseCase = new RegisterAddressUseCase(
    prismaAddressRepository,
  )

  return registerAddressUseCase
}
