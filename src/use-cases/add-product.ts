import { ProductRepository } from '@/repositories/products-repository'

interface ProductUseCaseRequest {
  orderId: number
  listProducts: {
    priceId: string
    quantity: number
    imgUrl: string
  }[]
}

interface ProductUseCaseResponse {
  products: {
    price_id: string
    quantity: number
    img_url: string
    order_id: number
  }[]
}

export class AddProductUseCase {
  constructor(private productsRepository: ProductRepository) {}

  async execute({
    orderId,
    listProducts,
  }: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
    const productsData = await Promise.all(
      listProducts.map(async (item) => {
        const addProduct = await this.productsRepository.create({
          img_url: item.imgUrl,
          order_id: orderId,
          quantity: item.quantity,
          price_id: item.priceId,
        })

        return addProduct
      }),
    )

    const products = productsData.map(
      ({ price_id, quantity, img_url, order_id }) => ({
        price_id,
        quantity,
        img_url,
        order_id,
      }),
    )

    return { products }
  }
}
