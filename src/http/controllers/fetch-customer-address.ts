import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchCustomerAddressUseCase } from '@/use-cases/factories/make-fetch-customer-address-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function fetchCustomerAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchAddressUseCase = makeFetchCustomerAddressUseCase()

    const { address } = await fetchAddressUseCase.execute({
      customerId: Number(request.user.sub),
    })

    return reply.status(201).send(JSON.stringify(address))
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
