import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeCreateOrderUseCase } from '@/use-cases/factories/make-create-order-use-case'
import { OrderAlreadyExistsError } from '@/use-cases/errors/order-already-exists-error'

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrderBodySchema = z.object({
    clientId: z.string(),
    paymentId: z.string(),
    id: z.string(),
    products: z
      .object({
        id: z.string(),
        quantity: z.number(),
      })
      .array(),
  })

  const { id, clientId, paymentId } = createOrderBodySchema.parse(request.body)

  try {
    const createOrderUseCase = makeCreateOrderUseCase()

    const { order } = await createOrderUseCase.execute({
      clientId,
      id,
      paymentId,
    })

    return reply.status(201).send(JSON.stringify({ order }))
  } catch (err) {
    if (err instanceof OrderAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
