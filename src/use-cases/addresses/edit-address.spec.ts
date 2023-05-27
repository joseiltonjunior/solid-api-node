import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { EditAddressUseCase } from './edit-address'

let addressesRepository: InMemoryAddressesRepository
let editAddressUseCase: EditAddressUseCase

describe('Edit  address Use case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    editAddressUseCase = new EditAddressUseCase(addressesRepository)
  })

  it('should be able to edit address', async () => {
    const userId = 'user01'

    await addressesRepository.create({
      street: 'Rua da felicidade',
      country: 'Brazil',
      state: 'São Paulo',
      city: 'São Paulo',
      number: '123',
      zip_code: '12345-123',
      complement: 'casa',
      user_id: userId,
    })

    const { address } = await editAddressUseCase.execute({
      street: 'Rua 13 de Maio',
      country: 'Brazil',
      state: 'Pernambuco',
      number: '321',
      zipCode: '12345-321',
      city: 'Recife',
      complement: '',
      userId,
    })

    expect(address.state).toEqual('Pernambuco')
    expect(address.street).toEqual('Rua 13 de Maio')
    expect(address.number).toEqual('321')
    expect(address.zip_code).toEqual('12345-321')
    expect(address.complement).toEqual('')
  })
})
