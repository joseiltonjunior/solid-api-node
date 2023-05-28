import { FastifyInstance } from 'fastify'
import { registerUser } from './register-user'
import { authenticate } from './authenticate'
import { fetchProfile } from './fetch-profile'
import { editProfile } from './edit-profile'
import { fetchManyUsers } from './fetch-many-users'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.get(
    '/users',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    fetchManyUsers,
  )
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, fetchProfile)
  app.put('/me', { onRequest: [verifyJWT] }, editProfile)
}
