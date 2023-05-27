import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { RegisterAddressUseCase } from './register-address'

let addressesRepository: InMemoryAddressesRepository
let createAddressUseCase: RegisterAddressUseCase

describe('Add a  Address Use Case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    createAddressUseCase = new RegisterAddressUseCase(addressesRepository)
  })

  it('should be able to register a address', async () => {
    const { address } = await createAddressUseCase.execute({
      street: 'Rua da felicidade',
      country: 'Brazil',
      state: 'São Paulo',
      number: '123',
      zipCode: '12345-123',
      complement: 'casa',
      city: 'São Paulo',
      userId: 'user01',
    })

    expect(address.id).toEqual(expect.any(Number))
    expect(address.created_at).toEqual(expect.any(Date))
  })
})
