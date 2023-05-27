import { EditProfileUseCase } from './edit-profile'
import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let editUserProfileUseCase: EditProfileUseCase

describe('Edit User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    editUserProfileUseCase = new EditProfileUseCase(usersRepository)
  })

  it('should be able to edit to profile', async () => {
    const { id } = await usersRepository.create({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password_hash: '123456',
      customer_id: 'cus01',
      phone: '81999999999',
    })

    const { user } = await editUserProfileUseCase.execute({
      id,
      email: 'junior@teste.com',
      name: 'José Junior',
      phone: '81888888888',
    })

    expect(user).toEqual(
      expect.objectContaining({
        email: 'junior@teste.com',
        name: 'José Junior',
        phone: '81888888888',
      }),
    )
  })

  it('Must not be possible to use an email already registered', async () => {
    const email = 'junior@gmail.com'

    await usersRepository.create({
      name: 'Junior Ferreira II',
      email,
      password_hash: '123456',
      customer_id: 'cus01',
      phone: '81999999993',
    })

    const { id } = await usersRepository.create({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password_hash: '123456',
      customer_id: 'cus02',
      phone: '81999999999',
    })

    expect(() =>
      editUserProfileUseCase.execute({
        email,
        name: 'José Junior',
        phone: '81888888888',
        id,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('Must not be possible to use an phone already registered', async () => {
    await usersRepository.create({
      name: 'Junior Ferreira II',
      email: 'junior@gmail.com',
      password_hash: '123456',
      customer_id: 'cus01',
      phone: '81999999993',
    })

    const { id } = await usersRepository.create({
      name: 'Junior Ferreira',
      email: 'junior.teste@gmail.com',
      password_hash: '123456',
      customer_id: 'cus02',
      phone: '81999999999',
    })

    expect(() =>
      editUserProfileUseCase.execute({
        email: 'juniortech@gmail.com',
        name: 'José Junior',
        phone: '81999999993',
        id,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
