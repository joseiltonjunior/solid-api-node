import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { AddProductUseCase } from './add-product'

let productsRepository: InMemoryProductsRepository
let addProductUseCase: AddProductUseCase

describe('Add a Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    addProductUseCase = new AddProductUseCase(productsRepository)
  })

  it('should be able to create', async () => {
    const { products } = await addProductUseCase.execute({
      orderId: 1,
      listProducts: [
        { quantity: 2, imgUrl: 'img_url', priceId: 'prod1' },
        { quantity: 2, imgUrl: 'img_url', priceId: 'prod2' },
      ],
    })

    expect(products[0].price_id).toEqual(expect.any(String))
  })
})
