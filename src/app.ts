import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { ordersRoutes } from './http/controllers/orders/routes'
import { addressesRoutes } from './http/controllers/addresses/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastifyCors } from '@fastify/cors'
import { swaggerOptions } from './swagger'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCors, {
  origin: ['http://localhost:3000', 'https://dcoffee-shop.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'PATCH'],
  credentials: true,
})
app.register(fastifyCookie)

app.register(fastifySwagger, swaggerOptions)
app.register(fastifySwaggerUi, {
  routePrefix: '/swagger',
})

app.register(usersRoutes)
app.register(ordersRoutes)
app.register(addressesRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
