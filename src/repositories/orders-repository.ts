import { PaginatedProps } from '@/utils/paginated-types'
import { Prisma, Order } from '@prisma/client'

export interface OrdersPaginated extends PaginatedProps {
  orders: Order[]
}

export interface OrderRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  findById(number: string): Promise<Order | null>
  findManyByIdPaginated(
    clientId: string,
    page: number,
  ): Promise<OrdersPaginated | null>
}
