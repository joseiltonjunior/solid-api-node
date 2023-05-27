import { AddressRepository } from '@/repositories/addresses-repository'

import { Address } from '@prisma/client'
import { AddressAlreadyExistsError } from '../errors/address-already-exists-error'

interface RegisterAddressUseCaseRequest {
  street: string
  country: string
  state: string
  number: string
  zipCode: string
  city: string
  complement: string
  userId: string
}

interface RegisterAddressUseCaseResponse {
  address: Address
}

export class RegisterAddressUseCase {
  constructor(private addressesRepository: AddressRepository) {}

  async execute({
    complement,
    country,
    number,
    state,
    street,
    city,
    zipCode,
    userId,
  }: RegisterAddressUseCaseRequest): Promise<RegisterAddressUseCaseResponse> {
    const addressExists = await this.addressesRepository.findByUserId(userId)

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
      user_id: userId,
    })

    return {
      address,
    }
  }
}
