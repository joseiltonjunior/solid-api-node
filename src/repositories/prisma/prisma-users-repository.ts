import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersPaginated, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findManyByPaginated(page: number): Promise<UsersPaginated | null> {
    const users = await prisma.user.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    const totalUsers = await prisma.user.count()

    return {
      users,
      currentPage: page,
      totalItems: totalUsers,
      totalPages: Math.ceil(totalUsers / 20),
    }
  }

  async edit(data: Prisma.UserUncheckedUpdateInput): Promise<User> {
    const user = await prisma.user.update({
      where: { id: data.id as string },
      data,
    })

    return user
  }

  async findByCustomerId(customerId: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        customer_id: customerId,
      },
    })

    return user
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({
      data,
    })

    return user
  }
}
