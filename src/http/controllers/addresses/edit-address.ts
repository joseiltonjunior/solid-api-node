import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeEditAddressUseCase } from '@/use-cases/factories/make-edit-address-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchUserProfileUseCase } from '@/use-cases/factories/make-fetch-user-profile-use-case'
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists'

export async function editAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editBodySchema = z.object({
    street: z.string(),
    country: z.string(),
    number: z.string(),
    state: z.string(),
    zipCode: z.string(),
    city: z.string(),
    complement: z.string(),
  })

  const { complement, country, number, state, city, street, zipCode } =
    editBodySchema.parse(request.body)

  try {
    const editAddressUseCase = makeEditAddressUseCase()
    const fetchProfileUseCase = makeFetchUserProfileUseCase()

    await fetchProfileUseCase.execute({
      id: request.user.sub,
    })

    const { address } = await editAddressUseCase.execute({
      complement,
      country,
      userId: request.user.sub,
      number,
      state,
      city,
      street,
      zipCode,
    })

    return reply.status(200).send(JSON.stringify(address))
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
