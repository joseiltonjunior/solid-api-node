import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    customerId: z.string(),
    phone: z.string().min(11),
  })

  const { email, name, password, customerId, phone } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    const { user } = await registerUseCase.execute({
      name,
      email,
      password,
      customerId,
      phone,
    })

    return reply.status(201).send(JSON.stringify(user))
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
