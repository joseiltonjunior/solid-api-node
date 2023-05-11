import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeGetProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getProfileParamSchema = z.object({
    id: z.number(),
  })

  const { id } = getProfileParamSchema.parse(request.params)

  try {
    const getProfileUseCase = makeGetProfileUseCase()

    const { user } = await getProfileUseCase.execute({ id })

    return reply.status(200).send(JSON.stringify(user))
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
