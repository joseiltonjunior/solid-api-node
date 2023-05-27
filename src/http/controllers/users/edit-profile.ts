import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

import { makeEditUserProfileUseCase } from '@/use-cases/factories/make-edit-user-profile-use-case'
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists'

export async function editProfile(
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
    const editUseCase = makeEditUserProfileUseCase()

    const { user } = await editUseCase.execute({
      name,
      email,
      phone,
      id: request.user.sub,
    })

    return reply
      .status(200)
      .send(JSON.stringify({ ...user, password_hash: undefined }))
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
