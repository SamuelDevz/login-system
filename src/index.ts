import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './config/env.js'
import { logger } from './config/logger.js'
import { errorHandler } from './errors/error-handler.js'
import { userRoutes } from './modules/users/users.route.js'
import cookie from './plugins/cookie.js'
import cors from './plugins/cors.js'
import database from './plugins/database.js'
import gracefulShutdown from './plugins/graceful-shutdown.js'
import helmet from './plugins/helmet.js'
import jwt from './plugins/jwt.js'
import rateLimit from './plugins/rate-limit.js'
import scalar from './plugins/scalar.js'
import swagger from './plugins/swagger.js'

const app = fastify({ logger: logger })

app.withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(database)
app.register(cookie)
app.register(jwt)
app.register(helmet)
app.register(cors)
app.register(gracefulShutdown)
app.register(rateLimit)
app.register(swagger)
app.register(scalar)

app.register(userRoutes, { prefix: '/api/users' })

app.setErrorHandler(errorHandler)

app
  .listen({
    port: env.PORT,
    host: env.HOST,
  })
  .then(() => {
    console.log(`HTTP server running on http://localhost:${env.PORT}`)
    console.log(`Docs available at http://localhost:${env.PORT}/docs`)
  })
  .catch((error) => {
    console.error(error)
    app.close()
    process.exit(1)
  })
