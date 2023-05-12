import { Order, Prisma } from '@prisma/client'
import { OrderRepository } from '../orders-repository'

export class InMemoryOrdersRepository implements OrderRepository {
  public items: Order[] = []

  async findManyByIdPaginated(
    clientId: number,
    page: number,
  ): Promise<Order[] | null> {
    const orders = this.items
      .filter((item) => item.customer_id === clientId)
      .slice((page - 1) * 20, page * 20)

    if (!orders) {
      return null
    }

    return orders
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.payment_intent_id === id)

    if (!order) {
      return null
    }

    return order
  }

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = {
      id: 1,
      payment_intent_id: data.payment_intent_id,
      method_payment_id: data.method_payment_id,
      customer_id: data.customer_id,
      created_at: new Date(),
    }

    this.items.push(order)

    return order
  }
}
