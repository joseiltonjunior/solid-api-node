import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { CustomerAlreadyExistsError } from '@/use-cases/errors/customer-already-exists-error'

import { makeEditCustomerProfileUseCase } from '@/use-cases/factories/make-edit-customer-profile-use-case'

export async function editCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().min(11).max(11),
  })

  const { email, name, phone } = editBodySchema.parse(request.body)

  try {
    const editUseCase = makeEditCustomerProfileUseCase()

    const { user } = await editUseCase.execute({
      name,
      email,
      phone,
      id: Number(request.user.sub),
    })

    return reply
      .status(200)
      .send(JSON.stringify({ ...user, password_hash: undefined }))
  } catch (err) {
    if (err instanceof CustomerAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
