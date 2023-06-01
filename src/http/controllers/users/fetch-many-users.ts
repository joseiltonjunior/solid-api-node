import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchManyUsers } from '@/use-cases/factories/make-fetch-many-users-use-case'

import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function fetchManyUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchManyUsersBodySchema = z.object({
    page: z.string(),
  })

  const { page } = fetchManyUsersBodySchema.parse(request.query)

  try {
    const fetchManyUsersUseCase = makeFetchManyUsers()

    const { users, currentPage, totalItems, totalPages } =
      await fetchManyUsersUseCase.execute({
        page: Number(page),
      })

    const usersWithoutPasswordHash = users.map((user) => {
      const newArray = {
        ...user,
        password_hash: undefined,
      }

      return newArray
    })

    return reply
      .status(200)
      .header('Content-Type', 'application/json')
      .send(
        JSON.stringify({
          users: usersWithoutPasswordHash,
          currentPage,
          totalItems,
          totalPages,
        }),
      )
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
