import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { EditCustomerAddressUseCase } from './edit-customer-address'

let addressesRepository: InMemoryAddressesRepository
let editCustomerAddressUseCase: EditCustomerAddressUseCase

describe('Edit customer address Use case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    editCustomerAddressUseCase = new EditCustomerAddressUseCase(
      addressesRepository,
    )
  })

  it('should be able to edit address', async () => {
    await addressesRepository.create({
      street: 'Rua da felicidade',
      country: 'Brazil',
      state: 'São Paulo',
      city: 'São Paulo',
      number: '123',
      zip_code: '12345-123',
      complement: 'casa',
      customer_id: 1,
    })

    const { address } = await editCustomerAddressUseCase.execute({
      street: 'Rua 13 de Maio',
      country: 'Brazil',
      state: 'Pernambuco',
      number: '321',
      zipCode: '12345-321',
      city: 'Recife',
      complement: '',
      customerId: 1,
    })

    expect(address.state).toEqual('Pernambuco')
    expect(address.street).toEqual('Rua 13 de Maio')
    expect(address.number).toEqual('321')
    expect(address.zip_code).toEqual('12345-321')
    expect(address.complement).toEqual('')
  })
})
