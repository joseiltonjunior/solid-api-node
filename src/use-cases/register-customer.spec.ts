import { RegisterCustomerUseCase } from './register-customer'
import { describe, it, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryCustumerRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { CustomerAlreadyExistsError } from './errors/customer-already-exists-error'

let customersRepository: InMemoryCustumerRepository
let sut: RegisterCustomerUseCase

describe('Customer Register Use Case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustumerRepository()
    sut = new RegisterCustomerUseCase(customersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password: '123456',
      customerId: 'cus01',
      phone: '81999999999',
    })

    expect(user.customer_id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password: '123456',
      customerId: 'cus01',
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
      customerId: 'cus01',
      phone: '81999999999',
    })

    expect(() =>
      sut.execute({
        name: 'Junior Ferreira',
        email,
        password: '123456',
        customerId: 'cus02',
        phone: '81999999992',
      }),
    ).rejects.toBeInstanceOf(CustomerAlreadyExistsError)
  })

  it('should not be able to register with same phone twice', async () => {
    const phone = '81999999999'

    await sut.execute({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password: '123456',
      customerId: 'cus01',
      phone,
    })

    expect(() =>
      sut.execute({
        name: 'Junior Ferreira',
        email: 'junior.teste2@gmail.com',
        password: '123456',
        customerId: 'cus02',
        phone,
      }),
    ).rejects.toBeInstanceOf(CustomerAlreadyExistsError)
  })

  it('should not be able to register with same customer ID twice', async () => {
    const customerId = 'customer01'

    await sut.execute({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password: '123456',
      customerId,
      phone: '81935838768',
    })

    expect(() =>
      sut.execute({
        name: 'Junior Ferreira',
        email: 'junior.teste2@gmail.com',
        password: '123456',
        customerId,
        phone: '83976568765',
      }),
    ).rejects.toBeInstanceOf(CustomerAlreadyExistsError)
  })
})
