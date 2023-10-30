import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Provider, authorizationCodeToJWT } from '@/auth'

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ token: string; email: string; picture?: string }>> {
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
      email: user.email,
      picture: user.picture,
    },
    {
      headers: {
        'Set-Cookie': `session=${user.token};path=/;`,
      },
    }
  )
}
