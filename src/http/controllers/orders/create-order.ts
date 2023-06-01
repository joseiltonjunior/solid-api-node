import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeCreateOrderUseCase } from '@/use-cases/factories/make-create-order-use-case'
import { makeAddProductUseCase } from '@/use-cases/factories/make-add-product-use-case'
import { OrderAlreadyExistsError } from '@/use-cases/errors/order-already-exists-error'

import { makeFetchUserProfileUseCase } from '@/use-cases/factories/make-fetch-user-profile-use-case'
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists'

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrderBodySchema = z.object({
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

  const { paymentIntentId, methodPaymentId, listProducts } =
    createOrderBodySchema.parse(request.body)

  try {
    const createOrderUseCase = makeCreateOrderUseCase()
    const addProductUseCase = makeAddProductUseCase()
    const fetchUserProfileUseCase = makeFetchUserProfileUseCase()

    await fetchUserProfileUseCase.execute({
      id: request.user.sub,
    })

    const { order } = await createOrderUseCase.execute({
      methodPaymentId,
      clientId: request.user.sub,
      paymentIntentId,
    })

    const { products } = await addProductUseCase.execute({
      orderId: order.id,
      listProducts,
    })

    return reply.status(201).send({ ...order, products })
  } catch (err) {
    if (err instanceof OrderAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
