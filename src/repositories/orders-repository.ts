import { Prisma, Order } from '@prisma/client'

export interface OrdersPaginated {
  orders: Order[]
  totalOrders: number
  currentPage: number
  totalPages: number
}

export interface OrderRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  findById(number: string): Promise<Order | null>
  findManyByIdPaginated(
    clientId: number,
    page: number,
  ): Promise<OrdersPaginated | null>
}
