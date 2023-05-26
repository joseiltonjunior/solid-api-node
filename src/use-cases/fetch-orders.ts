import {
  OrderRepository,
  OrdersPaginated,
} from '@/repositories/orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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
      throw new ResourceNotFoundError()
    }

    return orderResponse
  }
}
