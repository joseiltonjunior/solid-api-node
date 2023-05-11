import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      email: 'junior.teste@gmail.com',
      name: 'Junior Ferreira',
      password_hash: await hash('123456', 6),
      id: 'user1',
      phone: '81999999999',
    })

    const { user } = await sut.execute({
      email: 'junior.teste@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'junior.teste@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      email: 'junior.teste@gmail.com',
      name: 'Junior Ferreira',
      password_hash: await hash('123456', 6),
      id: 'user1',
      phone: '81999999999',
    })

    expect(() =>
      sut.execute({
        email: 'junior.teste@gmail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
