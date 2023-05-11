import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeCreateOrderUseCase } from '@/use-cases/factories/make-create-order-use-case'
import { makeAddProductUseCase } from '@/use-cases/factories/make-add-product-use-case'
import { OrderAlreadyExistsError } from '@/use-cases/errors/order-already-exists-error'

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrderBodySchema = z.object({
    clientId: z.number(),
    methodPaymentId: z.string(),
    paymentIntentId: z.string(),
    listProducts: z
      .object({
        priceId: z.string(),
        quantity: z.number(),
        imgUrl: z.string(),
      })
      .array(),
  })

  const { paymentIntentId, clientId, methodPaymentId, listProducts } =
    createOrderBodySchema.parse(request.body)

  try {
    const createOrderUseCase = makeCreateOrderUseCase()
    const addProductUseCase = makeAddProductUseCase()

    const { order } = await createOrderUseCase.execute({
      methodPaymentId,
      clientId,
      paymentIntentId,
    })

    const { products } = await addProductUseCase.execute({
      orderId: order.id,
      listProducts,
    })

    return reply.status(201).send(JSON.stringify({ ...order, products }))
  } catch (err) {
    if (err instanceof OrderAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
