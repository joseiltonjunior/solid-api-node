import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeRegisterAddressUseCase } from '@/use-cases/factories/make-register-address-use-case'
import { AddressAlreadyExistsError } from '@/use-cases/errors/address-already-exists-error'

import { makeFetchUserProfileUseCase } from '@/use-cases/factories/make-fetch-user-profile-use-case'

import { UserNotExistsError } from '@/use-cases/errors/user-not-exists'

export async function registerAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    street: z.string(),
    country: z.string(),
    number: z.string(),
    state: z.string(),
    city: z.string(),
    zipCode: z.string(),
    complement: z.string(),
  })

  const { complement, country, number, state, city, street, zipCode } =
    registerBodySchema.parse(request.body)

  try {
    const registerAddressUseCase = makeRegisterAddressUseCase()
    const fetchUserProfileUseCase = makeFetchUserProfileUseCase()

    await fetchUserProfileUseCase.execute({
      id: request.user.sub,
    })

    const { address } = await registerAddressUseCase.execute({
      complement,
      country,
      userId: request.user.sub,
      number,
      city,
      state,
      street,
      zipCode,
    })

    return reply.status(201).send(JSON.stringify(address))
  } catch (err) {
    if (err instanceof AddressAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
