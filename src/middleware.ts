import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from './auth'

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get('session')

  if (!cookie) {
    return NextResponse.redirect(req.nextUrl.origin)
  }

  try {
    await verifyJWT(cookie.value)
  } catch (err) {
    console.log(err)
    return NextResponse.redirect(req.nextUrl.origin)
  }
}

export const config = {
  matcher: '/profile',
}
