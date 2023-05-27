import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { EditAddressUseCase } from '@/use-cases/addresses/edit-address'

export function makeEditAddressUseCase() {
  const prismaAddressRepository = new PrismaAddressesRepository()
  const editAddressUseCase = new EditAddressUseCase(prismaAddressRepository)

  return editAddressUseCase
}
