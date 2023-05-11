import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { AddProductUseCase } from '../add-product'

export function makeAddProductUseCase() {
  const prismaProductRepository = new PrismaProductsRepository()
  const addProductUseCase = new AddProductUseCase(prismaProductRepository)

  return addProductUseCase
}
