import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const Roles = z.enum(['ADMIN', 'CUSTOMER'])

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    customerId: z.string(),
    phone: z.string().min(11).max(11),
    role: z.optional(Roles),
  })

  const { email, name, password, customerId, phone, role } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUserUseCase()

    const { user } = await registerUseCase.execute({
      name,
      email,
      password,
      customerId,
      phone,
      role,
    })

    return reply.status(201).send(JSON.stringify({ user }))
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
