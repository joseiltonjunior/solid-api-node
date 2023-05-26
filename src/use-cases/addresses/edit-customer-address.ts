import { AddressRepository } from '@/repositories/addresses-repository'

import { Address } from '@prisma/client'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface EditCustomerAddressUseCaseRequest {
  street: string
  country: string
  state: string
  number: string
  zipCode: string
  city: string
  complement: string
  customerId: number
}

interface EditCustomerAddressUseCaseResponse {
  address: Address
}

export class EditCustomerAddressUseCase {
  constructor(private addressesRepository: AddressRepository) {}

  async execute({
    complement,
    country,
    number,
    state,
    street,
    zipCode,
    city,
    customerId,
  }: EditCustomerAddressUseCaseRequest): Promise<EditCustomerAddressUseCaseResponse> {
    const addressExists = await this.addressesRepository.findByCustomerId(
      customerId,
    )

    if (!addressExists) {
      throw new ResourceNotFoundError()
    }

    const address = await this.addressesRepository.edit({
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
