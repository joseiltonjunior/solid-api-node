import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchCustomerProfileUseCase } from '@/use-cases/factories/make-fetch-customer-profile-use-case'

import { CustomerNotExistsError } from '@/use-cases/errors/customer-not-exists'

export async function fetchCustomerProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchCustomerProfileUseCase = makeFetchCustomerProfileUseCase()

    const { customer } = await fetchCustomerProfileUseCase.execute({
      id: Number(request.user.sub),
    })

    return reply
      .status(200)
      .send(JSON.stringify({ ...customer, password_hash: undefined }))
  } catch (err) {
    if (err instanceof CustomerNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
