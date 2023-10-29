import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRECT ?? ''

async function encode(email: string, ttl: string): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET)

  const alg = 'HS256'

  return new SignJWT({ email })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime(ttl)
    .sign(secret)
}

async function verify(token: string): Promise<void> {
  const secret = new TextEncoder().encode(JWT_SECRET)

  const { payload } = await jwtVerify(token, secret)

  const expires = payload.exp || 0
  const nowInSeconds = Math.trunc(Date.now() / 1000)

  // TODO: is this checked in jwtVerify?
  if (nowInSeconds > expires) {
    throw 'token has expired :('
  }
}

export { encode, verify }
