import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryCustumerRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let customersRepository: InMemoryCustumerRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustumerRepository()
    sut = new AuthenticateUseCase(customersRepository)
  })

  it('should be able to authenticate', async () => {
    await customersRepository.create({
      email: 'junior.teste@gmail.com',
      name: 'Junior Ferreira',
      password_hash: await hash('123456', 6),
      phone: '81999999999',
      customer_id: 'customer01',
    })

    const { customer } = await sut.execute({
      email: 'junior.teste@gmail.com',
      password: '123456',
    })

    expect(customer.id).toEqual(expect.any(Number))
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
    await customersRepository.create({
      email: 'junior.teste@gmail.com',
      name: 'Junior Ferreira',
      password_hash: await hash('123456', 6),
      phone: '81999999999',
      customer_id: 'customer01',
    })

    expect(() =>
      sut.execute({
        email: 'junior.teste@gmail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
