import { prisma } from '@/lib/prisma'
import { Prisma, Customer } from '@prisma/client'
import { CustomerRepository } from '../customers-repository'

export class PrismaCustomersRepository implements CustomerRepository {
  async findByCustomerId(customerId: string): Promise<Customer | null> {
    const customer = await prisma.customer.findFirst({
      where: {
        customer_id: customerId,
      },
    })

    return customer
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        phone,
      },
    })

    return customer
  }

  async findById(id: number) {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    })

    return customer
  }

  async findByEmail(email: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    })

    return customer
  }

  async create(data: Prisma.CustomerCreateInput) {
    const customer = prisma.customer.create({
      data,
    })

    return customer
  }
}
