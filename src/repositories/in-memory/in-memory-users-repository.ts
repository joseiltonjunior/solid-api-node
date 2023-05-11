import { User, Prisma } from '@prisma/client'
import { UserRepository } from '../users-repository'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

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
      id: 'user01',
      customer_id: data.customer_id,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      phone: data.phone,
    }

    this.items.push(user)

    return user
  }
}
