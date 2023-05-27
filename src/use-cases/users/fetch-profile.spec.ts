import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { hash } from 'bcryptjs'
import { FetchProfileUseCase } from './fetch-profile'
import { UserNotExistsError } from '../errors/user-not-exists'
import { randomUUID } from 'node:crypto'

let usersRepository: InMemoryUsersRepository
let fetchUserProfileUseCase: FetchProfileUseCase

describe('Fetch User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    fetchUserProfileUseCase = new FetchProfileUseCase(usersRepository)
  })

  it('should be able to user profile', async () => {
    const userResponse = await usersRepository.create({
      email: 'junior.teste@gmail.com',
      name: 'Junior Ferreira',
      password_hash: await hash('123456', 6),
      phone: '81999999999',
      customer_id: 'user1',
    })

    const { user } = await fetchUserProfileUseCase.execute({
      id: userResponse.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Junior Ferreira')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      fetchUserProfileUseCase.execute({
        id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
