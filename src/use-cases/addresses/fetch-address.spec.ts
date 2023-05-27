import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { FetchAddressUseCase } from './fetch-address'

let addressesRepository: InMemoryAddressesRepository
let fetchAddressUseCase: FetchAddressUseCase

describe('Get  Address Use Case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    fetchAddressUseCase = new FetchAddressUseCase(addressesRepository)
  })

  it('should be able to get a  address', async () => {
    const userId = 'user01'

    await addressesRepository.create({
      street: 'Rua da felicidade',
      country: 'Brazil',
      state: 'São Paulo',
      number: '123',
      city: 'São Paulo',
      zip_code: '12345-123',
      complement: 'casa',
      user_id: userId,
    })

    const { address } = await fetchAddressUseCase.execute({
      userId,
    })

    expect(address.id).toEqual(expect.any(Number))
    expect(address.created_at).toEqual(expect.any(Date))
  })
})
