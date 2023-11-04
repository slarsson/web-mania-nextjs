import { decodeJwt } from 'jose'
import { encode } from './jwt'

export const SESSION_COOKIE = 'session'

export enum Provider {
  Google,
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? ''

export function authenticationRedirectUrl(
  provider: Provider,
  redirectUri: string
): string {
  if (provider != Provider.Google) {
    throw 'only Google is supported for now :('
  }

  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  url.searchParams.append('client_id', GOOGLE_CLIENT_ID)
  url.searchParams.append('redirect_uri', redirectUri)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append(
    'scope',
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid'
  )
  url.searchParams.append('access_type', 'offline')
  return url.toString()
}

type TokenResponse = {
  id_token: string
  expires_in: number
}

export async function authenticationCodeToJWT(
  provider: Provider,
  code: string,
  redirectUri: string
): Promise<{ token: string }> {
  if (provider != Provider.Google) {
    throw 'only Google is supported for now :('
  }

  const params = new URLSearchParams({
    code: code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  }).toString()

  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })
  const data: TokenResponse = await resp.json()

  if (resp.status != 200) {
    console.error(data)
    throw `got unexpected status code: ${resp.status}`
  }

  console.log(`authenticationCodeToJWT:`, data.id_token, data.expires_in)

  const jwt = decodeJwt(data.id_token)
  const email = (jwt?.email as string) ?? ''
  const image = (jwt?.picture as string) ?? undefined
  const token = await encode(email, image, '5m')

  return {
    token: token,
  }
}
