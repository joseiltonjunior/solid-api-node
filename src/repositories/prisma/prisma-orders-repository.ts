import { Order, Prisma } from '@prisma/client'
import { OrderRepository } from '../orders-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrdersRepository implements OrderRepository {
  async findManyByIdPaginated(
    clientId: number,
    page: number,
  ): Promise<Order[] | null> {
    const orders = await prisma.order.findMany({
      where: { customer_id: clientId },
    })

    return orders
  }

  async findById(id: string) {
    const user = await prisma.order.findFirst({
      where: {
        payment_intent_id: id,
      },
    })

    return user
  }

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = prisma.order.create({
      data,
    })

    return order
  }
}
