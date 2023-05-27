import { FastifyInstance } from 'fastify'

import { createOrder } from './create-order'
import { fetchOrders } from './fetch-orders'

import { verifyJWT } from '../../middlewares/verify-jwt'

export async function ordersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/orders', createOrder)
  app.get('/orders', fetchOrders)
}
