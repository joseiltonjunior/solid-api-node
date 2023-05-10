import { Order, Prisma } from '@prisma/client'
import { OrderRepository } from '../orders-repository'

export class InMemoryOrdersRepository implements OrderRepository {
  public items: Order[] = []

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id === id)

    if (!order) {
      return null
    }

    return order
  }

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = {
      id: data.id,
      payment_id: data.payment_id,
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.items.push(order)

    return order
  }
}
