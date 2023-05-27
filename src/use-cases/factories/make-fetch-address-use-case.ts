import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { FetchAddressUseCase } from '@/use-cases/addresses/fetch-address'

export function makeFetchAddressUseCase() {
  const prismaRepository = new PrismaAddressesRepository()
  const fetchAddressUseCase = new FetchAddressUseCase(prismaRepository)

  return fetchAddressUseCase
}
