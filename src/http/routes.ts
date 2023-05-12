import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { createOrder } from './controllers/create-order'
import { fetchOrders } from './controllers/fetch-orders'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Auth routes **/

  app.post('/orders', createOrder)
  app.get('/orders', fetchOrders)

  app.get('/me/:id', profile)
}
