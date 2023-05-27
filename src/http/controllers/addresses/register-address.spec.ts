import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Register customer address (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('slould be able to register a address', async () => {
    await request(app.server).post('/users').send({
      name: 'Junior Ferreira',
      email: 'junior@teste.com',
      password: '123456',
      customerId: 'cus02',
      phone: '81999999995',
    })

    const responseToken = await request(app.server).post('/sessions').send({
      email: 'junior@teste.com',
      password: '123456',
    })

    const response = await request(app.server)
      .post('/addresses')
      .send({
        street: 'Rua da felicidade',
        country: 'Brazil',
        state: 'São Paulo',
        number: '123',
        city: 'São Paulo',
        zipCode: '12345-123',
        complement: 'casa',
      })
      .set('Authorization', `Bearer ${responseToken.body.token}`)

    const address = JSON.parse(response.text)

    expect(response.statusCode).toEqual(201)
    expect(address).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        created_at: expect.any(String),
      }),
    )
  })
})
