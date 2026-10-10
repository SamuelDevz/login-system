import type { PrismaClient, User } from '../../generated/prisma/client.js'

interface CreateUserDTO {
  name: string
  email: string
  password: string
}

interface IUserRepository {
  findMany(): Promise<User[] | null>
  findByEmail(email: string): Promise<User | null>
  save(data: CreateUserDTO): Promise<User | null>
}

export class UserRepository implements IUserRepository {
  constructor(private readonly db: PrismaClient) {}

  async findMany(): Promise<User[] | null> {
    return this.db.user.findMany()
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { email } })
  }

  async save(data: CreateUserDTO): Promise<User | null> {
    return this.db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })
  }
}
