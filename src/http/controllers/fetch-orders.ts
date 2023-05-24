import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeFetchOrdersUseCase } from '@/use-cases/factories/make-fetch-orders-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { NoOrderCustomerError } from '@/use-cases/errors/no-order-customer-error'
import { makeFetchProductsUseCase } from '@/use-cases/factories/make-fetch-products-use-case'

export async function fetchOrders(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchOrdersBodySchema = z.object({
    page: z.string(),
  })

  const { page } = fetchOrdersBodySchema.parse(request.query)

  try {
    const fetchOrdersUseCase = makeFetchOrdersUseCase()
    const fetchProductdUseCase = makeFetchProductsUseCase()

    const { currentPage, orders, totalOrders, totalPages } =
      await fetchOrdersUseCase.execute({
        clientId: Number(request.user.sub),
        page: Number(page),
      })

    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const products = await fetchProductdUseCase.execute({
          orderId: order.id,
        })

        const format = {
          ...order,
          ...products,
        }

        return format
      }),
    )

    return reply.status(200).send(
      JSON.stringify({
        orders: ordersWithProducts,
        currentPage,
        totalOrders,
        totalPages,
      }),
    )
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof NoOrderCustomerError) {
      return reply.status(200).send({ message: err.message })
    }

    throw err
  }
}
