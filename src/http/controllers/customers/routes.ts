import { FastifyInstance } from 'fastify'
import { registerCustomer } from './register-customer'
import { authenticate } from './authenticate'
import { fetchCustomerProfile } from './fetch-customer-profile'
import { editCustomer } from './edit-customer-profile'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'

export async function customersRoutes(app: FastifyInstance) {
  app.post('/customers', registerCustomer)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, fetchCustomerProfile)
  app.put('/me', { onRequest: [verifyJWT] }, editCustomer)
}
