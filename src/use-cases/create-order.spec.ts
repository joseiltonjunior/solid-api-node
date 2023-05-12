import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
import { CreateOrderUseCase } from './create-order'
import { OrderAlreadyExistsError } from './errors/order-already-exists-error'

let ordersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create a Order Use Case', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new CreateOrderUseCase(ordersRepository)
  })

  it('should be able to create', async () => {
    const { order } = await sut.execute({
      clientId: 1,
      methodPaymentId: 'card',
      paymentIntentId: 'pi2089321',
    })

    expect(order.id).toEqual(expect.any(Number))
  })

  it('should not be able to create with same id twice', async () => {
    await sut.execute({
      clientId: 1,
      methodPaymentId: 'card',
      paymentIntentId: 'pay01',
    })

    expect(() =>
      sut.execute({
        clientId: 1,
        methodPaymentId: 'card',
        paymentIntentId: 'pay01',
      }),
    ).rejects.toBeInstanceOf(OrderAlreadyExistsError)
  })
})
