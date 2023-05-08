import { RegisterUseCase } from './register'
import { describe, it, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password: '123456',
      id: 'user1',
      phone: '81999999999',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password: '123456',
      id: 'user1',
      phone: '81999999999',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'junior.teste@gmail.com'

    await sut.execute({
      name: 'Junior Ferreira',
      email,
      password: '123456',
      id: 'user1',
      phone: '81999999999',
    })

    expect(() =>
      sut.execute({
        name: 'Junior Ferreira',
        email,
        password: '123456',
        id: 'user2',
        phone: '81999999999',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
