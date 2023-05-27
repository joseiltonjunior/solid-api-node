import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { Roles } from '@/utils/roles-enum'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async edit(data: Prisma.UserUncheckedUpdateInput): Promise<User> {
    const user = this.items.find((user) => user.id === data.id) as User

    const index = this.items.findIndex((user) => user.id === data.id)

    const userEdit = {
      ...user,
      name: data.name as string,
      email: data.email as string,
      phone: data.phone as string,
    }

    if (index !== -1) {
      this.items.splice(index, 1, userEdit)
    }

    return userEdit
  }

  async findByCustomerId(customerId: string): Promise<User | null> {
    const user = this.items.find((item) => item.customer_id === customerId)

    if (!user) {
      return null
    }

    return user
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = this.items.find((item) => item.phone === phone)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      customer_id: data.customer_id,
      role: Roles.CUSTOMER,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
      phone: data.phone,
    }

    this.items.push(user)

    return user
  }
}
