import { Order, Prisma } from '@prisma/client'
import { OrderRepository, OrdersPaginated } from '../orders-repository'

export class InMemoryOrdersRepository implements OrderRepository {
  public items: Order[] = []

  async findManyByIdPaginated(
    clientId: string,
    page: number,
  ): Promise<OrdersPaginated | null> {
    const orders = this.items
      .filter((item) => item.user_id === clientId)
      .slice((page - 1) * 10, page * 10)

    if (!orders) {
      return null
    }

    return {
      orders,
      currentPage: page,
      totalItems: this.items.length,
      totalPages: Math.ceil(this.items.length / 10),
    }
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
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.items.push(order)

    return order
  }
}
