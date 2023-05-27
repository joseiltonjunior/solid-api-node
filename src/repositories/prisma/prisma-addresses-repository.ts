import { Prisma, Address } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { AddressRepository } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressRepository {
  async edit(data: Prisma.AddressUncheckedUpdateInput): Promise<Address> {
    const address = await prisma.address.update({
      where: { user_id: data.user_id as string },
      data,
    })

    return address
  }

  async findByUserId(id: string): Promise<Address | null> {
    const address = await prisma.address.findUnique({
      where: {
        user_id: id,
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
