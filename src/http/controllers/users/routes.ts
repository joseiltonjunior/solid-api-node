import { FastifyInstance } from 'fastify'
import { registerUser } from './register-user'
import { authenticate } from './authenticate'
import { fetchProfile } from './fetch-profile'
import { editProfile } from './edit-profile'
import { fetchManyUsers } from './fetch-many-users'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { schemasUsers } from './schemas'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', schemasUsers.createUser, registerUser)

  app.post('/sessions', schemasUsers.authUser, authenticate)
  app.patch('/token/refresh', schemasUsers.refreshToken, refresh)

  app.get(
    '/me',
    { onRequest: [verifyJWT], ...schemasUsers.fetchUser },
    fetchProfile,
  )

  app.put(
    '/me',
    {
      onRequest: [verifyJWT],
      ...schemasUsers.editUser,
    },
    editProfile,
  )

  app.get(
    '/users',
    {
      onRequest: [verifyJWT, verifyUserRole('ADMIN')],
      ...schemasUsers.fetchManyUsersPaginated,
    },
    fetchManyUsers,
  )
}
