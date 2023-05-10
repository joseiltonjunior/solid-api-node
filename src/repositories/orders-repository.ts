import { Prisma, Order } from '@prisma/client'

export interface OrderRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  findById(id: string): Promise<Order | null>
}
