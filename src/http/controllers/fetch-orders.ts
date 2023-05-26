import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeFetchOrdersUseCase } from '@/use-cases/factories/make-fetch-orders-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

import { makeFetchProductsUseCase } from '@/use-cases/factories/make-fetch-products-use-case'
import { makeFetchCustomerProfileUseCase } from '@/use-cases/factories/make-fetch-customer-profile-use-case'
import { CustomerNotExistsError } from '@/use-cases/errors/customer-not-exists'

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
    const fetchCustomerProfileUseCase = makeFetchCustomerProfileUseCase()

    await fetchCustomerProfileUseCase.execute({
      id: Number(request.user.sub),
    })

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
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof CustomerNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
