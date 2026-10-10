import type { JWT } from '@fastify/jwt'
import type { PrismaClient } from '../generated/prisma/client.ts'

type UserPayload = {
  id: string
  email: string
  name: string
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: UserPayload
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaClient
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    authenticate: (
      req: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void> | void
  }
}
