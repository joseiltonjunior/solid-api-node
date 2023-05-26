import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeRegisterCustomerAddressUseCase } from '@/use-cases/factories/make-register-customer-address-use-case'
import { AddressAlreadyExistsError } from '@/use-cases/errors/address-already-exists-error'

import { makeFetchCustomerProfileUseCase } from '@/use-cases/factories/make-fetch-customer-profile-use-case'

import { CustomerNotExistsError } from '@/use-cases/errors/customer-not-exists'

export async function registerCustomerAddress(
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
    const registerAddressUseCase = makeRegisterCustomerAddressUseCase()
    const fetchCustomerProfileUseCase = makeFetchCustomerProfileUseCase()

    await fetchCustomerProfileUseCase.execute({
      id: Number(request.user.sub),
    })

    const { address } = await registerAddressUseCase.execute({
      complement,
      country,
      customerId: Number(request.user.sub),
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

    if (err instanceof CustomerNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
