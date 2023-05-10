import { Order } from '@prisma/client'
import { OrderRepository } from '@/repositories/orders-repository'
import { OrderAlreadyExistsError } from './errors/order-already-exists-error'

interface OrderUseCaseRequest {
  id: string
  clientId: string
  paymentId: string
}

interface OrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrderRepository) {}

  async execute({
    clientId,
    paymentId,
    id,
  }: OrderUseCaseRequest): Promise<OrderUseCaseResponse> {
    const orderWithSameId = await this.ordersRepository.findById(id)

    if (orderWithSameId) {
      throw new OrderAlreadyExistsError()
    }

    const order = await this.ordersRepository.create({
      payment_id: paymentId,
      id,
      user_id: clientId,
    })

    return {
      order,
    }
  }
}
