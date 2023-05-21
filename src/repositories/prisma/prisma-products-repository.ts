import { Product, Prisma } from '@prisma/client'
import { ProductRepository } from '../products-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProductsRepository implements ProductRepository {
  async findManyProductsByOrderId(orderId: number): Promise<Product[] | null> {
    const products = prisma.product.findMany({
      where: {
        order_id: orderId,
      },
    })

    return products
  }

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product = prisma.product.create({
      data,
    })

    return product
  }
}
