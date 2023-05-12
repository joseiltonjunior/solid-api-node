import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeFetchOrdersUseCase } from '@/use-cases/factories/make-fetch-orders-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { NoOrderCustomerError } from '@/use-cases/errors/no-order-customer-error'

export async function fetchOrders(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchOrdersBodySchema = z.object({
    clientId: z.string(),
    page: z.string(),
  })

  const { clientId, page } = fetchOrdersBodySchema.parse(request.query)

  try {
    const fetchOrdersUseCase = makeFetchOrdersUseCase()

    const { orders } = await fetchOrdersUseCase.execute({
      clientId: Number(clientId),
      page: Number(page),
    })

    return reply.status(200).send(JSON.stringify(orders))
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
