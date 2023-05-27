import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { CreateOrderUseCase } from '@/use-cases/orders/create-order'

export function makeCreateOrderUseCase() {
  const prismaOrderRepository = new PrismaOrdersRepository()
  const createOrderUseCase = new CreateOrderUseCase(prismaOrderRepository)

  return createOrderUseCase
}
