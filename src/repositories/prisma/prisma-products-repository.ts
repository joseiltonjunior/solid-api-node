import { Product, Prisma } from '@prisma/client'
import { ProductRepository } from '../products-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProductsRepository implements ProductRepository {
  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product = prisma.product.create({
      data,
    })

    return product
  }
}
