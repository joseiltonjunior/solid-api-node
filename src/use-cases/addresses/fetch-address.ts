import { AddressRepository } from '@/repositories/addresses-repository'
import { Address } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FetchAddressUseCaseRequest {
  userId: string
}

interface FetchAddressUseCaseResponse {
  address: Address
}

export class FetchAddressUseCase {
  constructor(private addressesRepository: AddressRepository) {}

  async execute({
    userId,
  }: FetchAddressUseCaseRequest): Promise<FetchAddressUseCaseResponse> {
    const address = await this.addressesRepository.findByUserId(userId)

    if (!address) {
      throw new ResourceNotFoundError()
    }

    return {
      address,
    }
  }
}
