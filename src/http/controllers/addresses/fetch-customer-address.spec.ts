import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Fetch customer address (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('slould be able to get a customer address', async () => {
    await request(app.server).post('/customers').send({
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

    await request(app.server)
      .post('/addresses')
      .send({
        street: 'Rua da felicidade',
        country: 'Brazil',
        state: 'São Paulo',
        city: 'São Paulo',
        number: '123',
        zipCode: '12345-123',
        complement: 'casa',
      })
      .set('Authorization', `Bearer ${responseToken.body.token}`)

    const response = await request(app.server)
      .get('/addresses')
      .send()
      .set('Authorization', `Bearer ${responseToken.body.token}`)

    const address = JSON.parse(response.text)

    expect(response.statusCode).toEqual(200)
    expect(address).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        created_at: expect.any(String),
      }),
    )
  })
})
