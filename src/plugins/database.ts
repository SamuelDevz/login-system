import { PrismaPg } from '@prisma/adapter-pg'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { env } from '../config/env.js'
import { PrismaClient } from '../generated/prisma/client.js'

const databasePlugin: FastifyPluginAsync = async (app) => {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  await prisma.$connect()
  app.decorate('db', prisma)
  app.addHook('onClose', async () => {
    await prisma.$disconnect()
  })
}

export default fastifyPlugin(databasePlugin, { name: 'db' })
