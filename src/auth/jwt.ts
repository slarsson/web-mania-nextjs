import { SignJWT, jwtVerify, decodeJwt } from 'jose'

const JWT_SECRET = process.env.JWT_SECRECT ?? ''

interface TokenClaims {
  email: string
  image: string | undefined
}

// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
declare module 'jose' {
  export interface JWTPayload extends TokenClaims {}
}

async function encode(
  email: string,
  image: string | undefined,
  ttl: string
): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET)
  const alg = 'HS256'

  return new SignJWT({ email, image })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(ttl)
    .sign(secret)
}

async function verify(token: string): Promise<void> {
  const secret = new TextEncoder().encode(JWT_SECRET)

  const { payload } = await jwtVerify(token, secret)

  const expires = payload.exp || 0
  const nowInSeconds = Math.trunc(Date.now() / 1000)

  // maybe this is not needed?
  if (nowInSeconds > expires) {
    throw 'token has expired :('
  }
}

function decode(jwt: string): TokenClaims {
  const { email, image } = decodeJwt(jwt)
  return { email, image }
}

export { encode, verify, decode }
