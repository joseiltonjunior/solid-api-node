import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeCreateOrderUseCase } from '@/use-cases/factories/make-create-order-use-case'
import { makeAddProductUseCase } from '@/use-cases/factories/make-add-product-use-case'
import { OrderAlreadyExistsError } from '@/use-cases/errors/order-already-exists-error'

import { makeFetchCustomerProfileUseCase } from '@/use-cases/factories/make-fetch-customer-profile-use-case'
import { CustomerNotExistsError } from '@/use-cases/errors/customer-not-exists'

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
    const fetchCustomerProfileUseCase = makeFetchCustomerProfileUseCase()

    await fetchCustomerProfileUseCase.execute({
      id: Number(request.user.sub),
    })

    const { order } = await createOrderUseCase.execute({
      methodPaymentId,
      clientId: Number(request.user.sub),
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

    if (err instanceof CustomerNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
