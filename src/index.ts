import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env, logger } from './config/env.js'
import { userRoutes } from './modules/user/user.routes.js'
import cookie from './plugins/cookie.js'
import cors from './plugins/cors.js'
import database from './plugins/database.js'
import errorHandler from './plugins/error-handler.js'
import gracefulShutdown from './plugins/graceful-shutdown.js'
import healthcheck from './plugins/healthcheck.js'
import helmet from './plugins/helmet.js'
import jwt from './plugins/jwt.js'
import rateLimit from './plugins/rate-limit.js'
import scalar from './plugins/scalar.js'
import swagger from './plugins/swagger.js'

const app = fastify({
  logger: logger[env.NODE_ENV] ?? true,
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.withTypeProvider<ZodTypeProvider>()

app.register(database)
app.register(errorHandler)
app.register(helmet)
app.register(cors)
app.register(cookie)
app.register(jwt)
app.register(gracefulShutdown)
app.register(swagger)
app.register(healthcheck)
app.register(scalar)
app.register(rateLimit)

app.register(userRoutes, { prefix: '/api/users' })

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server running at http://localhost:${env.PORT}`)
    console.log(`Docs avaiable at http://localhost:${env.PORT}/docs`)
  })
  .catch((error) => {
    console.error(error)
    app.close()
    process.exit(1)
  })
