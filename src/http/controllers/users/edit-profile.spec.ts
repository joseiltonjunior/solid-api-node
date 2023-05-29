import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticate } from '@/utils/test/create-and-get-token-user'

describe('Customer edit profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('slould be able to edit profile', async () => {
    const token = await createAndAuthenticate(app)

    const responseEdit = await request(app.server)
      .put('/me')
      .send({
        name: 'Junior Ferreira II',
        email: 'junior@gmail.com',
        phone: '81999999993',
      })
      .set('Authorization', `Bearer ${token}`)

    const user = JSON.parse(responseEdit.text)

    expect(responseEdit.statusCode).toEqual(200)

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Junior Ferreira II',
        email: 'junior@gmail.com',
        phone: '81999999993',
      }),
    )
  })
})
