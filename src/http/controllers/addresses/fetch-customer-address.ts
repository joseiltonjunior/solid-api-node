import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchCustomerAddressUseCase } from '@/use-cases/factories/make-fetch-customer-address-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchCustomerProfileUseCase } from '@/use-cases/factories/make-fetch-customer-profile-use-case'
import { CustomerNotExistsError } from '@/use-cases/errors/customer-not-exists'

export async function fetchCustomerAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchAddressUseCase = makeFetchCustomerAddressUseCase()
    const fetchCustomerProfileUseCase = makeFetchCustomerProfileUseCase()

    await fetchCustomerProfileUseCase.execute({
      id: Number(request.user.sub),
    })

    const { address } = await fetchAddressUseCase.execute({
      customerId: Number(request.user.sub),
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
