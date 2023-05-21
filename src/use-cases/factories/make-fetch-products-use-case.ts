import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { FetchProductsUseCase } from '../fetch-products'

export function makeFetchProductsUseCase() {
  const prismaProductRepository = new PrismaProductsRepository()
  const fetchProductsUseCase = new FetchProductsUseCase(prismaProductRepository)

  return fetchProductsUseCase
}
