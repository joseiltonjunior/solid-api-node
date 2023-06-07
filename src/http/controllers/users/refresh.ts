import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  const cookiesError = 'No Authorization was found in request.cookies'

  await request.jwtVerify({ onlyCookie: true }).catch((err: Error) => {
    if (err.message.includes(cookiesError)) {
      return reply.status(401).send({ message: cookiesError })
    }

    throw err
  })

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    { sign: { sub: request.user.sub } },
  )

  const refreshToken = await reply.jwtSign(
    { role },
    { sign: { sub: request.user.sub, expiresIn: '7d' } },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    })
    .status(200)
    .send({
      token,
    })
}
