import { Order } from '@prisma/client'
import { OrderRepository } from '@/repositories/orders-repository'
import { OrderAlreadyExistsError } from '../errors/order-already-exists-error'

interface OrderUseCaseRequest {
  paymentIntentId: string
  clientId: number
  methodPaymentId: string
}

interface OrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrderRepository) {}

  async execute({
    clientId,
    methodPaymentId,
    paymentIntentId,
  }: OrderUseCaseRequest): Promise<OrderUseCaseResponse> {
    const orderWithSameId = await this.ordersRepository.findById(
      paymentIntentId,
    )

    if (orderWithSameId) {
      throw new OrderAlreadyExistsError()
    }

    const order = await this.ordersRepository.create({
      method_payment_id: methodPaymentId,
      customer_id: clientId,
      payment_intent_id: paymentIntentId,
    })

    return {
      order,
    }
  }
}
