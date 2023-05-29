import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticate } from '@/utils/test/create-and-get-token-user'

describe('Fetch many users paginated only admins (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('slould be able get customer profile', async () => {
    const token = await createAndAuthenticate(app, true)

    await request(app.server).post('/users').send({
      name: 'Junior Ferreira',
      email: 'junior@gmail.com',
      password: '123456',
      customerId: 'cus02',
      phone: '81999999933',
    })

    await request(app.server).post('/users').send({
      name: 'Junior Ferreira',
      email: 'junior.test@gmail.com',
      password: '123456',
      customerId: 'cus03',
      phone: '81999999966',
    })

    const usersResponse = await request(app.server)
      .get('/users?page=1')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { users } = JSON.parse(usersResponse.text)

    expect(usersResponse.statusCode).toEqual(200)
    expect(users).toHaveLength(3)
  })
})
