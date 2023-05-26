import { Prisma, Address } from '@prisma/client'
import { AddressRepository } from '../addresses-repository'

export class InMemoryAddressesRepository implements AddressRepository {
  public items: Address[] = []

  async edit(data: Prisma.AddressUncheckedUpdateInput): Promise<Address> {
    this.items.filter((address) => address.customer_id !== data.customer_id)

    const address = {
      id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      street: data.street as string,
      country: data.country as string,
      city: data.city as string,
      state: data.state as string,
      number: data.number as string,
      zip_code: data.zip_code as string,
      complement: data.complement as string,
      customer_id: data.customer_id as number,
    }

    this.items.push(address)

    return address
  }

  async findByCustomerId(id: number): Promise<Address | null> {
    const address = this.items.find((item) => item.customer_id === id)

    if (!address) {
      return null
    }

    return address
  }

  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const address = {
      id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      street: data.street,
      city: data.city,
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
