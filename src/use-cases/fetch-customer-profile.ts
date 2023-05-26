import { CustomerRepository } from '@/repositories/customers-repository'

import { Customer } from '@prisma/client'

import { CustomerNotExistsError } from './errors/customer-not-exists'

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
      throw new CustomerNotExistsError()
    }

    return {
      customer,
    }
  }
}
