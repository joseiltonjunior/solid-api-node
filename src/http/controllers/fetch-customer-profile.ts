import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchCustomerProfileUseCase } from '@/use-cases/factories/make-fetch-customer-profile-use-case'

export async function fetchCustomerProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchCustomerProfileUseCase = makeFetchCustomerProfileUseCase()

  const { customer } = await fetchCustomerProfileUseCase.execute({
    id: Number(request.user.sub),
  })

  return reply
    .status(200)
    .send(JSON.stringify({ ...customer, password_hash: undefined }))
}
