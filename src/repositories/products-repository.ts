import { Prisma, Product } from '@prisma/client'

export interface ProductRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  findManyProductsByOrderId(orderId: number): Promise<Product[] | null>
}
