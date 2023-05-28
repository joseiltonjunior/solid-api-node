import { PaginatedProps } from '@/utils/paginated-types'
import { Prisma, User } from '@prisma/client'

export interface UsersPaginated extends PaginatedProps {
  users: User[]
}
export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByPhone(phone: string): Promise<User | null>
  findByCustomerId(customerId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  edit(data: Prisma.UserUncheckedUpdateInput): Promise<User>
  findManyByPaginated(page: number): Promise<UsersPaginated | null>
}
