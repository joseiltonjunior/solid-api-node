import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchAddressUseCase } from '@/use-cases/factories/make-fetch-address-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchUserProfileUseCase } from '@/use-cases/factories/make-fetch-user-profile-use-case'
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists'

export async function fetchAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchAddressUseCase = makeFetchAddressUseCase()
    const fetchProfileUseCase = makeFetchUserProfileUseCase()

    await fetchProfileUseCase.execute({
      id: request.user.sub,
    })

    const { address } = await fetchAddressUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send(address)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
