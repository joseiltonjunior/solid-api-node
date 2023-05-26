import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { FetchProductsUseCase } from '@/use-cases/orders/fetch-products'

export function makeFetchProductsUseCase() {
  const prismaProductRepository = new PrismaProductsRepository()
  const fetchProductsUseCase = new FetchProductsUseCase(prismaProductRepository)

  return fetchProductsUseCase
}
