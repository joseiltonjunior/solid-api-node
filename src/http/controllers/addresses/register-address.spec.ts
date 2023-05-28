import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndGetToken } from '@/utils/test/create-and-get-token-user'

describe('Register customer address (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('slould be able to register a address', async () => {
    const token = await createAndGetToken(app)

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
      .set('Authorization', `Bearer ${token}`)

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
