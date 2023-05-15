import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Customer register (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('slould be able to register', async () => {
    const response = await request(app.server).post('/customers').send({
      name: 'Junior Ferreira',
      email: 'junior@teste.com',
      password: '123456',
      customerId: 'cus02',
      phone: '81999999995',
    })

    expect(response.statusCode).toEqual(201)
  })
})
