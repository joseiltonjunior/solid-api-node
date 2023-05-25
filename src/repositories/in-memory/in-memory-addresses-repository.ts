import { Prisma, Address } from '@prisma/client'
import { AddressRepository } from '../addresses-repository'

export class InMemoryAddressesRepository implements AddressRepository {
  async findByCustomerId(id: number): Promise<Address | null> {
    const address = this.items.find((item) => item.customer_id === id)

    if (!address) {
      return null
    }

    return address
  }

  public items: Address[] = []

  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const address = {
      id: 1,
      created_at: new Date(),
      street: data.street,
      country: data.country,
      state: data.state,
      number: data.number,
      zip_code: data.zip_code,
      complement: data.complement,
      customer_id: data.customer_id,
    }

    this.items.push(address)

    return address
  }
}
