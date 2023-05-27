import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { FetchOrdersUseCase } from '@/use-cases/orders/fetch-orders'

export function makeFetchOrdersUseCase() {
  const prismaOrderRepository = new PrismaOrdersRepository()
  const fetchOrdersUseCase = new FetchOrdersUseCase(prismaOrderRepository)

  return fetchOrdersUseCase
}
