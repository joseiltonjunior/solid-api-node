import { CustomerRepository } from '@/repositories/customers-repository'

import { Customer } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchCustomerProfileUseCaseRequest {
  id: number
}

interface FetchCustomerProfileUseCaseResponse {
  customer: Customer
}

export class FetchCustomerProfileUseCase {
  constructor(private customersRepository: CustomerRepository) {}

  async execute({
    id,
  }: FetchCustomerProfileUseCaseRequest): Promise<FetchCustomerProfileUseCaseResponse> {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new ResourceNotFoundError()
    }

    return {
      customer,
    }
  }
}
