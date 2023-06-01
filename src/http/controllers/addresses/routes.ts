import { FastifyInstance } from 'fastify'

import { registerAddress } from './register-address'
import { fetchAddress } from './fetch-address'
import { editAddress } from './edit-address'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function addressesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post(
    '/addresses',
    {
      schema: {
        tags: ['Addresses'],
        summary: 'Register user address',
      },
    },
    registerAddress,
  )
  app.get(
    '/addresses',
    {
      schema: {
        tags: ['Addresses'],
        summary: 'Fetch user address',
      },
    },
    fetchAddress,
  )
  app.put(
    '/addresses',
    {
      schema: {
        tags: ['Addresses'],
        summary: 'Edit user address',
      },
    },
    editAddress,
  )
}
