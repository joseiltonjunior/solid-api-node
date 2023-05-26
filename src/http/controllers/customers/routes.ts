import { FastifyInstance } from 'fastify'
import { registerCustomer } from './register-customer'
import { authenticate } from './authenticate'
import { fetchCustomerProfile } from './fetch-customer-profile'

import { verifyJWT } from '../../middlewares/verify-jwt'

export async function customersRoutes(app: FastifyInstance) {
  app.post('/customers', registerCustomer)
  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJWT] }, fetchCustomerProfile)
}
