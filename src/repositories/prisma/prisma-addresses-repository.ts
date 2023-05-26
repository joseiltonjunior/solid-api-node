import { Prisma, Address } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { AddressRepository } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressRepository {
  async edit(data: Prisma.AddressUncheckedUpdateInput): Promise<Address> {
    const address = await prisma.address.update({
      where: { customer_id: data.customer_id as number },
      data,
    })

    return address
  }

  async findByCustomerId(id: number): Promise<Address | null> {
    const address = await prisma.address.findUnique({
      where: {
        customer_id: id,
      },
    })

    return address
  }

  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = prisma.address.create({
      data,
    })

    return address
  }
}
