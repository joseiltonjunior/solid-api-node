import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { CustomerAlreadyExistsError } from '@/use-cases/errors/customer-already-exists-error'

import { makeRegisterCustomerUseCase } from '@/use-cases/factories/make-register-customer-use-case'

export async function registerCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    customerId: z.string(),
    phone: z.string().min(11).max(11),
  })

  const { email, name, password, customerId, phone } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterCustomerUseCase()

    const { user } = await registerUseCase.execute({
      name,
      email,
      password,
      customerId,
      phone,
    })

    return reply.status(201).send(JSON.stringify(user))
  } catch (err) {
    if (err instanceof CustomerAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof CustomerAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
