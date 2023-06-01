import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchUserProfileUseCase } from '@/use-cases/factories/make-fetch-user-profile-use-case'

import { UserNotExistsError } from '@/use-cases/errors/user-not-exists'

export async function fetchProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchProfileUseCase = makeFetchUserProfileUseCase()

    const { user } = await fetchProfileUseCase.execute({
      id: request.user.sub,
    })

    return reply
      .status(200)
      .send({ ...user, password_hash: undefined, role: undefined })
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
