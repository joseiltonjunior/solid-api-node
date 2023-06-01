import { FastifyInstance } from 'fastify'

import { createOrder } from './create-order'
import { fetchOrders } from './fetch-orders'

import { verifyJWT } from '../../middlewares/verify-jwt'

export async function ordersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post(
    '/orders',
    {
      schema: {
        tags: ['Orders'],
        summary: 'Create a order',
      },
    },
    createOrder,
  )
  app.get(
    '/orders',
    {
      schema: {
        tags: ['Orders'],
        summary: 'Fetch many orders paginated',
      },
    },
    fetchOrders,
  )
}
