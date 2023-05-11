import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { getUserProfile } from './controllers/get-user-profile'
import { createOrder } from './controllers/create-order'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.get('/users/:id', getUserProfile)

  app.post('/sessions', authenticate)

  app.post('/orders', createOrder)
}
