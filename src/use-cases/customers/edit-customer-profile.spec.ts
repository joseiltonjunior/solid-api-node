import { EditCustomerProfileUseCase } from './edit-customer-profile'
import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryCustumerRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { CustomerAlreadyExistsError } from '../errors/customer-already-exists-error'

let customersRepository: InMemoryCustumerRepository
let editCustomerProfileUseCase: EditCustomerProfileUseCase

describe('Edit Customer Profile Use Case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustumerRepository()
    editCustomerProfileUseCase = new EditCustomerProfileUseCase(
      customersRepository,
    )
  })

  it('should be able to edit to profile', async () => {
    const { id } = await customersRepository.create({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password_hash: '123456',
      customer_id: 'cus01',
      phone: '81999999999',
    })

    const { user } = await editCustomerProfileUseCase.execute({
      id,
      email: 'junior@teste.com',
      name: 'José Junior',
      phone: '81888888888',
    })

    expect(user).toEqual(
      expect.objectContaining({
        email: 'junior@teste.com',
        name: 'José Junior',
        phone: '81888888888',
      }),
    )
  })

  it('Must not be possible to use an email already registered', async () => {
    await customersRepository.create({
      name: 'Junior Ferreira II',
      email: 'junior@gmail.com',
      password_hash: '123456',
      customer_id: 'cus01',
      phone: '81999999993',
    })

    const { id } = await customersRepository.create({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password_hash: '123456',
      customer_id: 'cus02',
      phone: '81999999999',
    })

    expect(() =>
      editCustomerProfileUseCase.execute({
        email: 'junior@gmail.com',
        name: 'José Junior',
        phone: '81888888888',
        id,
      }),
    ).rejects.toBeInstanceOf(CustomerAlreadyExistsError)
  })

  it('Must not be possible to use an phone already registered', async () => {
    await customersRepository.create({
      name: 'Junior Ferreira II',
      email: 'junior@gmail.com',
      password_hash: '123456',
      customer_id: 'cus01',
      phone: '81999999993',
    })

    const { id } = await customersRepository.create({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password_hash: '123456',
      customer_id: 'cus02',
      phone: '81999999999',
    })

    expect(() =>
      editCustomerProfileUseCase.execute({
        email: 'juniortech@gmail.com',
        name: 'José Junior',
        phone: '81999999993',
        id,
      }),
    ).rejects.toBeInstanceOf(CustomerAlreadyExistsError)
  })
})
