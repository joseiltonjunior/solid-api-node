import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Customer edit profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('slould be able to edit profile', async () => {
    await request(app.server).post('/users').send({
      name: 'Junior Ferreira',
      email: 'junior@teste.com',
      password: '123456',
      customerId: 'cus02',
      phone: '81999999995',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'junior@teste.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const responseEdit = await request(app.server)
      .put('/me')
      .send({
        name: 'Junior Ferreira II',
        email: 'junior@gmail.com',
        phone: '81999999993',
      })
      .set('Authorization', `Bearer ${token}`)

    const user = JSON.parse(responseEdit.text)

    expect(responseEdit.statusCode).toEqual(200)

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Junior Ferreira II',
        email: 'junior@gmail.com',
        phone: '81999999993',
      }),
    )
  })
})
