import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndGetToken } from '@/utils/test/create-and-get-token-user'

describe('Edit customer address (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('slould be able to edit a address', async () => {
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
      .put('/addresses')
      .send({
        street: 'Avenida Fernão Dias',
        country: 'Brazil',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        number: '321',
        zipCode: '12345-321',
        complement: 'empresarial',
      })
      .set('Authorization', `Bearer ${token}`)

    const address = JSON.parse(response.text)

    expect(response.statusCode).toEqual(200)
    expect(address).toEqual(
      expect.objectContaining({
        street: 'Avenida Fernão Dias',
        country: 'Brazil',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        number: '321',
        zip_code: '12345-321',
        complement: 'empresarial',
        id: expect.any(Number),
        user_id: expect.any(String),
      }),
    )
  })
})
