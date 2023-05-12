import { FastifyInstance } from 'fastify'
import { registerCustomer } from './controllers/register-customer'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/fetch-customer-profile'
import { createOrder } from './controllers/create-order'
import { fetchOrders } from './controllers/fetch-orders'

export async function appRoutes(app: FastifyInstance) {
  app.post('/customers', registerCustomer)
  app.post('/sessions', authenticate)

  /** Auth routes **/

  app.post('/orders', createOrder)
  app.get('/orders', fetchOrders)

  app.get('/me/:id', profile)
}
