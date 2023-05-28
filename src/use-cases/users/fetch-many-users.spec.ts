import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { hash } from 'bcryptjs'
import { FetchManyUsersUseCase } from './fetch-many-users'

let usersRepository: InMemoryUsersRepository
let fetchManyUserProfileUseCase: FetchManyUsersUseCase

describe('Fetch Many Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    fetchManyUserProfileUseCase = new FetchManyUsersUseCase(usersRepository)
  })

  it('should be able to get a users list paginated', async () => {
    await usersRepository.create({
      email: 'junior.teste@gmail.com',
      name: 'Junior Ferreira',
      password_hash: await hash('123456', 6),
      phone: '81999999999',
      customer_id: 'user1',
    })

    await usersRepository.create({
      email: 'junior@gmail.com',
      name: 'Junior Ferreira',
      password_hash: await hash('123456', 6),
      phone: '81999999993',
      customer_id: 'user2',
    })

    await usersRepository.create({
      email: 'junior@outlook.com',
      name: 'Junior Ferreira',
      password_hash: await hash('123456', 6),
      phone: '81999999991',
      customer_id: 'user3',
    })

    const { users } = await fetchManyUserProfileUseCase.execute({ page: 1 })

    expect(users).toHaveLength(3)
    expect(users).toEqual([
      expect.objectContaining({ customer_id: 'user1' }),
      expect.objectContaining({ customer_id: 'user2' }),
      expect.objectContaining({ customer_id: 'user3' }),
    ])
  })
})
