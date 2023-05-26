import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { FetchProductsUseCase } from './fetch-products'

let productsRepository: InMemoryProductsRepository
let fetchProductsUseCase: FetchProductsUseCase

describe('Fetch a Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    fetchProductsUseCase = new FetchProductsUseCase(productsRepository)
  })

  it('should be able to fetch many products by order id', async () => {
    for (let i = 1; i <= 4; i++) {
      await productsRepository.create({
        order_id: 1,
        quantity: 1,
        img_url: `img_url0${i}`,
        price_id: `prod0${i}`,
      })
    }

    const { products } = await fetchProductsUseCase.execute({
      orderId: 1,
    })

    expect(products).toHaveLength(4)
    expect(products).toEqual([
      expect.objectContaining({ price_id: 'prod01' }),
      expect.objectContaining({ price_id: 'prod02' }),
      expect.objectContaining({ price_id: 'prod03' }),
      expect.objectContaining({ price_id: 'prod04' }),
    ])
  })
})
