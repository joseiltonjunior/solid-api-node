import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndGetToken } from '@/utils/test/create-and-get-token-user'

describe('Get profile customer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('slould be able get customer profile', async () => {
    const token = await createAndGetToken(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const profileUser = JSON.parse(profileResponse.text)

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileUser).toEqual(
      expect.objectContaining({
        email: 'junior@teste.com',
      }),
    )
  })
})
