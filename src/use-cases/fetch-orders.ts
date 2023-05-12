import { Order } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrderRepository } from '@/repositories/orders-repository'
import { NoOrderCustomerError } from './errors/no-order-customer-error'

interface FetchOdersUseCaseRequest {
  clientId: number
  page: number
}

interface FetchOrdersUseCaseResponse {
  orders: Order[]
}

export class FetchOrdersUseCase {
  constructor(private ordersRepository: OrderRepository) {}

  async execute({
    clientId,
    page,
  }: FetchOdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findManyByIdPaginated(
      clientId,
      page,
    )

    if (!orders) {
      throw new ResourceNotFoundError()
    }

    if (orders.length < 1) {
      throw new NoOrderCustomerError()
    }

    return {
      orders,
    }
  }
}
