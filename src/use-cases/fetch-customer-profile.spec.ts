import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryCustumerRepository } from '@/repositories/in-memory/in-memory-customers-repository'

import { hash } from 'bcryptjs'
import { FetchCustomerProfileUseCase } from './fetch-customer-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let customersRepository: InMemoryCustumerRepository
let sut: FetchCustomerProfileUseCase

describe('Fetch customer Profile Use Case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustumerRepository()
    sut = new FetchCustomerProfileUseCase(customersRepository)
  })

  it('should be able to customer profile', async () => {
    const createdCustomer = await customersRepository.create({
      email: 'junior.teste@gmail.com',
      name: 'Junior Ferreira',
      password_hash: await hash('123456', 6),
      phone: '81999999999',
      customer_id: 'user1',
    })

    const { customer } = await sut.execute({
      id: createdCustomer.id,
    })

    expect(customer.id).toEqual(expect.any(Number))
    expect(customer.name).toEqual('Junior Ferreira')
  })

  it('should not be able to get customer profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        id: 999,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
