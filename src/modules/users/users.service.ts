import bcrypt from 'bcrypt'
import { AppError } from '../../errors/app-error.js'
import type { UserRepository } from './users.repository.js'
import type { CreateUserInput, LoginUserInput } from './users.schema.js'

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserInput) {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email)

    if (userAlreadyExist !== null)
      throw new AppError('Email already registered', 409)

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(data.password, saltRounds)

    return await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
      role: data.role,
    })
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new AppError('User not found', 404)

    return user
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id)

    if (!user) throw new AppError('User not found', 404)

    return user
  }

  async loginUser(data: LoginUserInput) {
    const user = await this.userRepository.findByEmail(data.email)

    if (!user) throw new AppError('Invalid credentials', 400)

    const valid = await bcrypt.compare(data.password, user.password)

    if (!user || !valid) throw new AppError('Invalid credentials', 400)

    return user
  }
}
