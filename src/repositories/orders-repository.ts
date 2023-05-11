import { Prisma, Order } from '@prisma/client'

export interface OrderRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  findById(number: string): Promise<Order | null>
}
