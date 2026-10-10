import bcrypt from 'bcrypt'
import { AppError } from '../../errors/app-error.js'
import type { UserRepository } from './user.repository.js'
import type { CreateUserInput, LoginUserInput } from './user.schema.js'

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsers() {
    const users = await this.userRepository.findMany()

    if (!users) throw new AppError('Users not found', 404, 'USERS_NOT_FOUND')

    return users
  }

  async createUser(data: CreateUserInput) {
    const userExist = await this.userRepository.findByEmail(data.email)

    if (userExist !== null)
      throw new AppError('The email already in use', 409, 'EMAIL_ALREADY_EXISTS')

    const SALT_ROUNDS = 10
    const hash = await bcrypt.hash(data.password, SALT_ROUNDS)

    return await this.userRepository.save({
      name: data.name,
      email: data.email,
      password: hash,
    })
  }

  async autenticate(data: LoginUserInput) {
    const user = await this.userRepository.findByEmail(data.email)

    if (!user) {
      throw new AppError(
        'Invalid email or password',
        401,
        'INVALID_CREDENTIALS',
      )
    }

    const isValid = await bcrypt.compare(data.password, user.password)
    if (!isValid) {
      throw new AppError(
        'Invalid email or password',
        401,
        'INVALID_CREDENTIALS',
      )
    }

    return user
  }
}
