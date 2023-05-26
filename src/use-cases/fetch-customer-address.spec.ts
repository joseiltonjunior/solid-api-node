import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { FetchCustomerAddressUseCase } from './fetch-customer-address'

let addressesRepository: InMemoryAddressesRepository
let fetchCustomerAddressUseCase: FetchCustomerAddressUseCase

describe('Get Customer Address Use Case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    fetchCustomerAddressUseCase = new FetchCustomerAddressUseCase(
      addressesRepository,
    )
  })

  it('should be able to get a customer address', async () => {
    const customerId = 1

    await addressesRepository.create({
      street: 'Rua da felicidade',
      country: 'Brazil',
      state: 'São Paulo',
      number: '123',
      zip_code: '12345-123',
      complement: 'casa',
      customer_id: customerId,
    })

    const { address } = await fetchCustomerAddressUseCase.execute({
      customerId,
    })

    expect(address.id).toEqual(expect.any(Number))
    expect(address.created_at).toEqual(expect.any(Date))
  })
})
