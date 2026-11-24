import type { PrismaClient, Role, User } from '../../generated/prisma/client.js'

interface CreateUserDTO {
  name: string
  email: string
  password: string
  role: Role
}

interface IUserRepository {
  findAll(): Promise<User[] | null>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: CreateUserDTO): Promise<User | null>
  delete(id: string): Promise<User | null>
}

export class UserRepository implements IUserRepository {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<User[] | null> {
    return await this.db.user.findMany()
  }

  async findById(id: string): Promise<User | null> {
    return await this.db.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.db.user.findUnique({ where: { email } })
  }

  async create(data: CreateUserDTO): Promise<User | null> {
    return await this.db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      },
    })
  }

  async delete(id: string): Promise<User | null> {
    return await this.db.user.delete({ where: { id } })
  }
}
