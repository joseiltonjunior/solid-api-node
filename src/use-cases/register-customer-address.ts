import { AddressRepository } from '@/repositories/addresses-repository'

import { Address } from '@prisma/client'
import { AddressAlreadyExistsError } from './errors/address-already-exists-error'

interface RegisterCustomerAddressUseCaseRequest {
  street: string
  country: string
  state: string
  number: string
  zipCode: string
  city: string
  complement: string
  customerId: number
}

interface RegisterCustomerAddressUseCaseResponse {
  address: Address
}

export class RegisterCustomerAddressUseCase {
  constructor(private addressesRepository: AddressRepository) {}

  async execute({
    complement,
    country,
    number,
    state,
    street,
    city,
    zipCode,
    customerId,
  }: RegisterCustomerAddressUseCaseRequest): Promise<RegisterCustomerAddressUseCaseResponse> {
    const addressExists = await this.addressesRepository.findByCustomerId(
      customerId,
    )

    if (addressExists) {
      throw new AddressAlreadyExistsError()
    }

    const address = await this.addressesRepository.create({
      complement,
      country,
      number,
      state,
      street,
      city,
      zip_code: zipCode,
      customer_id: customerId,
    })

    return {
      address,
    }
  }
}
