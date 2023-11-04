import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Provider, authorizationCodeToJWT } from '@/auth/auth'
import { SESSION_COOKIE } from '@/auth/auth'

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ token: string }>> {
  const body = await req.json()

  const data = z.object({
    code: z.string(),
    redirectUri: z.string(),
  })

  const { code, redirectUri } = data.parse(body)

  const user = await authorizationCodeToJWT(Provider.Google, code, redirectUri)

  return NextResponse.json(
    {
      token: user.token,
    },
    {
      headers: {
        'Set-Cookie': `${SESSION_COOKIE}=${user.token};path=/;`,
      },
    }
  )
}
