import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Get a many orders (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a many orders', async () => {
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

    await request(app.server)
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

    await request(app.server)
      .post('/orders')
      .send({
        methodPaymentId: 'card',
        paymentIntentId: 'deu booom 2',
        listProducts: [
          {
            priceId: 'prod112',
            quantity: 2,
            imgUrl: 'img01',
          },
          {
            priceId: 'prod121',
            quantity: 1,
            imgUrl: 'img01',
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`)

    const ordersResponse = await request(app.server)
      .get('/orders?page=1')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { orders, totalOrders, totalPages, currentPage } = JSON.parse(
      ordersResponse.text,
    )

    expect(ordersResponse.statusCode).toEqual(200)
    expect(orders).toHaveLength(2)
    expect(currentPage).toEqual(1)
    expect(totalOrders).toEqual(2)
    expect(totalPages).toEqual(1)

    expect(orders).toEqual([
      expect.objectContaining({ id: 1 }),
      expect.objectContaining({ id: 2 }),
    ])
  })
})
