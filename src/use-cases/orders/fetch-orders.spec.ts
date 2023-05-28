import { describe, it, expect, beforeEach } from 'vitest'

import { FetchOrdersUseCase } from './fetch-orders'
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'

let ordersRepository: InMemoryOrdersRepository
let fetchOrdersUseCase: FetchOrdersUseCase

describe('Fetch Orders Use Case', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    fetchOrdersUseCase = new FetchOrdersUseCase(ordersRepository)
  })

  it('should be able to fetch orders', async () => {
    await ordersRepository.create({
      user_id: 'user01',
      method_payment_id: 'card',
      payment_intent_id: 'pi2089321',
    })

    await ordersRepository.create({
      user_id: 'user01',
      method_payment_id: 'card',
      payment_intent_id: 'pi2089322',
    })

    const { orders } = await fetchOrdersUseCase.execute({
      clientId: 'user01',
      page: 1,
    })

    expect(orders).toHaveLength(2)
    expect(orders).toEqual([
      expect.objectContaining({ payment_intent_id: 'pi2089321' }),
      expect.objectContaining({ payment_intent_id: 'pi2089322' }),
    ])
  })

  it('should be able to fetch paginated orders', async () => {
    for (let i = 1; i <= 12; i++) {
      await ordersRepository.create({
        user_id: 'user01',
        method_payment_id: 'card',
        payment_intent_id: `payment${i}`,
      })
    }

    const orderResponse = await fetchOrdersUseCase.execute({
      clientId: 'user01',
      page: 2,
    })

    expect(orderResponse.orders).toHaveLength(2)
    expect(orderResponse.orders).toEqual([
      expect.objectContaining({ payment_intent_id: 'payment11' }),
      expect.objectContaining({ payment_intent_id: 'payment12' }),
    ])
    expect(orderResponse.currentPage).toEqual(2)
    expect(orderResponse.totalItems).toEqual(12)
    expect(orderResponse.totalPages).toEqual(2)
  })
})
