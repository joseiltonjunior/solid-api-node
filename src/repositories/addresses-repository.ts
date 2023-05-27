import { Prisma, Address } from '@prisma/client'

export interface AddressRepository {
  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
  findByUserId(id: string): Promise<Address | null>
  edit(data: Prisma.AddressUncheckedUpdateInput): Promise<Address>
}
