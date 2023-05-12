import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { makeFetchCustomerProfileUseCase } from '@/use-cases/factories/make-fetch-customer-profile-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const fetchCustomerProfileBodySchema = z.object({
    id: z.string(),
  })

  const { id } = fetchCustomerProfileBodySchema.parse(request.params)

  try {
    const fetchCustomerProfileUseCase = makeFetchCustomerProfileUseCase()

    const { customer } = await fetchCustomerProfileUseCase.execute({
      id: Number(id),
    })

    return reply.status(200).send(JSON.stringify(customer))
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
