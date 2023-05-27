import { Prisma, Address } from '@prisma/client'
import { AddressRepository } from '../addresses-repository'

export class InMemoryAddressesRepository implements AddressRepository {
  public items: Address[] = []

  async edit(data: Prisma.AddressUncheckedUpdateInput): Promise<Address> {
    const address = this.items.find(
      (address) => address.user_id !== data.user_id,
    ) as Address
    const index = this.items.findIndex(
      (address) => address.user_id === data.user_id,
    )

    const addressEdit = {
      ...address,
      street: data.street as string,
      country: data.country as string,
      city: data.city as string,
      state: data.state as string,
      number: data.number as string,
      zip_code: data.zip_code as string,
      complement: data.complement as string,
    }

    if (index !== -1) {
      this.items.splice(index, 1, addressEdit)
    }

    return addressEdit
  }

  async findByUserId(id: string): Promise<Address | null> {
    const address = this.items.find((item) => item.user_id === id)

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
      user_id: data.user_id,
    }

    this.items.push(address)

    return address
  }
}
