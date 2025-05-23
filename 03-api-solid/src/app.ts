import fastify from 'fastify'
import { register } from './http/controller/register'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.post('/users', register)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/ NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
