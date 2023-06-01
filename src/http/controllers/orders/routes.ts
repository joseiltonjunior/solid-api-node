import { FastifyInstance } from 'fastify'

import { createOrder } from './create-order'
import { fetchOrders } from './fetch-orders'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { schemasOrders } from './schemas'

export async function ordersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/orders', schemasOrders.createOrder, createOrder)
  app.get('/orders', schemasOrders.fetchOrder, fetchOrders)
}
