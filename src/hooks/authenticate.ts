import type { FastifyRequest } from 'fastify'
import { AppError } from '../errors/app-error.js'

export async function authenticate(req: FastifyRequest) {
  try {
    await req.jwtVerify()
  } catch {
    throw new AppError('Invalid or expired token', 401)
  }
}
