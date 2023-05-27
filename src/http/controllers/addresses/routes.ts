import { FastifyInstance } from 'fastify'

import { registerAddress } from './register-address'
import { fetchAddress } from './fetch-address'
import { editAddress } from './edit-address'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function addressesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/addresses', registerAddress)
  app.get('/addresses', fetchAddress)
  app.put('/addresses', editAddress)
}
