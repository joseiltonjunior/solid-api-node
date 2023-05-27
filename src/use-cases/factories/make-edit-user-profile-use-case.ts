import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { EditProfileUseCase } from '@/use-cases/users/edit-profile'

export function makeEditUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const editUserProfileUseCase = new EditProfileUseCase(prismaUsersRepository)

  return editUserProfileUseCase
}
