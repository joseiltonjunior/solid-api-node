import { Product } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ProductRepository } from '@/repositories/products-repository'

interface FetchProductsUseCaseRequest {
  orderId: number
}

interface FetchProductsUseCaseResponse {
  products: Product[]
}

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductRepository) {}

  async execute({
    orderId,
  }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findManyProductsByOrderId(
      orderId,
    )

    if (!products) {
      throw new ResourceNotFoundError()
    }

    return {
      products,
    }
  }
}
