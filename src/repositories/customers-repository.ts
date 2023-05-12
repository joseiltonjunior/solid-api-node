import { Prisma, Customer } from '@prisma/client'

export interface CustomerRepository {
  findById(id: number): Promise<Customer | null>
  findByPhone(phone: string): Promise<Customer | null>
  findByCustomerId(customerId: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
}
