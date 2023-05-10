import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
import { CreateOrderUseCase } from './create-order'

let ordersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create a Order Use Case', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new CreateOrderUseCase(ordersRepository)
  })

  it('should be able to create', async () => {
    const { order } = await sut.execute({
      clientId: 'client1',
      paymentId: 'card',
      id: 'order1',
    })

    expect(order.id).toEqual(expect.any(String))
  })
})