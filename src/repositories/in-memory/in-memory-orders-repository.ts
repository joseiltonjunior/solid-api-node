import { Order, Prisma } from '@prisma/client'
import { OrderRepository } from '../orders-repository'

export class InMemoryOrdersRepository implements OrderRepository {
  public items: Order[] = []

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.payment_intent_id === id)

    if (!order) {
      return null
    }

    return order
  }

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = {
      id: 'order01',
      payment_intent_id: data.payment_intent_id,
      method_payment_id: data.method_payment_id,
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.items.push(order)

    return order
  }
}
