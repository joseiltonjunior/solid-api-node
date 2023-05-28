import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndGetToken } from '@/utils/test/create-and-get-token-user'

describe('Fetch customer address (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('slould be able to get a customer address', async () => {
    const token = await createAndGetToken(app)

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
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app.server)
      .get('/addresses')
      .send()
      .set('Authorization', `Bearer ${token}`)

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
