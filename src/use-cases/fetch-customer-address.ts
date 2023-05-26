import { AddressRepository } from '@/repositories/addresses-repository'
import { Address } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchCustomerAddressUseCaseRequest {
  customerId: number
}

interface FetchCustomerAddressUseCaseResponse {
  address: Address
}

export class FetchCustomerAddressUseCase {
  constructor(private addressesRepository: AddressRepository) {}

  async execute({
    customerId,
  }: FetchCustomerAddressUseCaseRequest): Promise<FetchCustomerAddressUseCaseResponse> {
    const address = await this.addressesRepository.findByCustomerId(customerId)

    if (!address) {
      throw new ResourceNotFoundError()
    }

    return {
      address,
    }
  }
}
