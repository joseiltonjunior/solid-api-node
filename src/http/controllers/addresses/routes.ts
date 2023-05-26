import { FastifyInstance } from 'fastify'

import { registerCustomerAddress } from './register-customer-address'
import { fetchCustomerAddress } from './fetch-customer-address'
import { editCustomerAddress } from './edit-customer-address'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function addressesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/addresses', registerCustomerAddress)
  app.get('/addresses', fetchCustomerAddress)
  app.put('/addresses', editCustomerAddress)
}
