import { AddressRepository } from '@/repositories/addresses-repository'

import { Address } from '@prisma/client'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface EditAddressUseCaseRequest {
  street: string
  country: string
  state: string
  number: string
  zipCode: string
  city: string
  complement: string
  userId: string
}

interface EditAddressUseCaseResponse {
  address: Address
}

export class EditAddressUseCase {
  constructor(private addressesRepository: AddressRepository) {}

  async execute({
    complement,
    country,
    number,
    state,
    street,
    zipCode,
    city,
    userId,
  }: EditAddressUseCaseRequest): Promise<EditAddressUseCaseResponse> {
    const addressExists = await this.addressesRepository.findByUserId(userId)

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
      user_id: userId,
    })

    return {
      address,
    }
  }
}
