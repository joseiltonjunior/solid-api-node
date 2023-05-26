import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeEditCustomerAddressUseCase } from '@/use-cases/factories/make-edit-customer-address-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchCustomerProfileUseCase } from '@/use-cases/factories/make-fetch-customer-profile-use-case'
import { CustomerNotExistsError } from '@/use-cases/errors/customer-not-exists'

export async function editCustomerAddress(
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
    const editCustomerAddressUseCase = makeEditCustomerAddressUseCase()
    const fetchCustomerProfileUseCase = makeFetchCustomerProfileUseCase()

    await fetchCustomerProfileUseCase.execute({
      id: Number(request.user.sub),
    })

    const { address } = await editCustomerAddressUseCase.execute({
      complement,
      country,
      customerId: Number(request.user.sub),
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

    if (err instanceof CustomerNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
