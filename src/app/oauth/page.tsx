'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setSessionCookie } from '@/session'

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [tokenError, setTokenError] = useState<string | undefined>(undefined)
  const code = searchParams?.code ?? ''
  const router = useRouter()

  useEffect(() => {
    if (!code || code instanceof Array) {
      setTokenError('no code found :(')
      return
    }

    const get = async () => {
      try {
        const req = await fetch('/oauth/token', {
          method: 'POST',
          body: JSON.stringify({
            code: code,
            redirectUri: 'http://localhost:3000/oauth',
          }),
        })
        const data = (await req.json()) as {
          token: string
        }
        setSessionCookie(data.token)
        router.push('/profile')
      } catch (err) {
        setTokenError('failed to get token :(')
      }
    }
    get()
  }, [code, router])

  if (tokenError) {
    return <div>error: {tokenError}</div>
  }
  return <div>loading...</div>
}
