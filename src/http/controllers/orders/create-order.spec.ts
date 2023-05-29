import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticate } from '@/utils/test/create-and-get-token-user'

describe('Make an order (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to make an order', async () => {
    const token = await createAndAuthenticate(app)

    const orderResponse = await request(app.server)
      .post('/orders')
      .send({
        methodPaymentId: 'card',
        paymentIntentId: 'deu booom',
        listProducts: [
          {
            priceId: 'prod212',
            quantity: 2,
            imgUrl: 'img01',
          },
          {
            priceId: 'prod221',
            quantity: 1,
            imgUrl: 'img01',
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`)

    const order = JSON.parse(orderResponse.text)

    expect(orderResponse.statusCode).toEqual(201)
    expect(order).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
      }),
    )
  })
})
