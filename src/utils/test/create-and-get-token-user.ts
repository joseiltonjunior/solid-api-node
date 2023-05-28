import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndGetToken(app: FastifyInstance, isAdmin = false) {
  const userResponse = await request(app.server)
    .post('/users')
    .send({
      name: 'Junior Ferreira',
      email: 'junior@teste.com',
      password: '123456',
      customerId: 'cus01',
      phone: '81999999995',
      role: isAdmin ? 'ADMIN' : 'CUSTOMER',
    })

  const user = JSON.parse(userResponse.text)

  return user.token
}
