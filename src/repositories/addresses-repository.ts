import { Prisma, Address } from '@prisma/client'

export interface AddressRepository {
  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
  findByCustomerId(id: number): Promise<Address | null>
}
