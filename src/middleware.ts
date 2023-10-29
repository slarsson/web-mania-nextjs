import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('session')

  if (!cookie) {
    return NextResponse.redirect(req.nextUrl.origin)
  }

  // TODO: verify cookie and extract stuff
}

export const config = {
  matcher: '/profile',
}
