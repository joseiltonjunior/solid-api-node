import { FastifyInstance } from 'fastify'

import { registerAddress } from './register-address'
import { fetchAddress } from './fetch-address'
import { editAddress } from './edit-address'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { schemasAddresses } from './schemas'

export async function addressesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/addresses', schemasAddresses.registerAddress, registerAddress)
  app.get('/addresses', schemasAddresses.fetchAddress, fetchAddress)
  app.put('/addresses', schemasAddresses.editAddress, editAddress)
}
