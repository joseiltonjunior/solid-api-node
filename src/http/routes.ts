import { FastifyInstance } from 'fastify'
import { registerCustomer } from './controllers/register-customer'
import { authenticate } from './controllers/authenticate'
import { fetchCustomerProfile } from './controllers/fetch-customer-profile'
import { createOrder } from './controllers/create-order'
import { fetchOrders } from './controllers/fetch-orders'
import { registerCustomerAddress } from './controllers/register-customer-address'
import { fetchCustomerAddress } from './controllers/fetch-customer-address'
import { editCustomerAddress } from './controllers/edit-customer-address'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/customers', registerCustomer)
  app.post('/sessions', authenticate)

  /** Auth routes **/

  app.post('/orders', { onRequest: [verifyJWT] }, createOrder)
  app.get('/orders', { onRequest: [verifyJWT] }, fetchOrders)

  app.get('/me', { onRequest: [verifyJWT] }, fetchCustomerProfile)

  app.post('/addresses', { onRequest: [verifyJWT] }, registerCustomerAddress)
  app.get('/addresses', { onRequest: [verifyJWT] }, fetchCustomerAddress)
  app.put('/addresses', { onRequest: [verifyJWT] }, editCustomerAddress)
}
