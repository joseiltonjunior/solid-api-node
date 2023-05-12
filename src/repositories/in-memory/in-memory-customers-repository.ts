import { Customer, Prisma } from '@prisma/client'
import { CustomerRepository } from '../customers-repository'

export class InMemoryCustumerRepository implements CustomerRepository {
  public items: Customer[] = []

  async findByCustomerId(customerId: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.customer_id === customerId)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.phone === phone)

    if (!customer) {
      return null
    }

    return customer
  }

  async findById(id: number): Promise<Customer | null> {
    const customer = this.items.find((item) => item.id === id)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.email === email)

    if (!customer) {
      return null
    }

    return customer
  }

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    const customer = {
      id: 1,
      customer_id: data.customer_id,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      phone: data.phone,
    }

    this.items.push(customer)

    return customer
  }
}
