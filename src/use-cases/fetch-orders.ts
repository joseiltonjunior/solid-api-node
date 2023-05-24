// import { Order } from '@prisma/client'
import {
  OrderRepository,
  OrdersPaginated,
} from '@/repositories/orders-repository'
import { NoOrderCustomerError } from './errors/no-order-customer-error'

interface FetchOdersUseCaseRequest {
  clientId: number
  page: number
}

interface FetchOrdersUseCaseResponse extends OrdersPaginated {}

export class FetchOrdersUseCase {
  constructor(private ordersRepository: OrderRepository) {}

  async execute({
    clientId,
    page,
  }: FetchOdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orderResponse = await this.ordersRepository.findManyByIdPaginated(
      clientId,
      page,
    )

    if (!orderResponse) {
      throw new NoOrderCustomerError()
    }

    return orderResponse
  }
}
