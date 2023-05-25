import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { RegisterCustomerAddressUseCase } from './register-customer-address'

let addressesRepository: InMemoryAddressesRepository
let createCustomerAddressUseCase: RegisterCustomerAddressUseCase

describe('Add a Customer Address Use Case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    createCustomerAddressUseCase = new RegisterCustomerAddressUseCase(
      addressesRepository,
    )
  })

  it('should be able to register a address', async () => {
    const { address } = await createCustomerAddressUseCase.execute({
      street: 'Rua da felicidade',
      country: 'Brazil',
      state: 'São Paulo',
      number: '123',
      zipCode: '12345-123',
      complement: 'casa',
      customerId: 1,
    })

    expect(address.id).toEqual(expect.any(Number))
    expect(address.created_at).toEqual(expect.any(Date))
  })
})
