'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const { loading, error } = useTokenEndpoint(extractCodeParam(searchParams))

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>
  }

  router.push('/profile')
}

function extractCodeParam(params: {
  [key: string]: string | string[] | undefined
}): string {
  const arrOrString = params?.code ?? ''
  const code = arrOrString instanceof Array ? '' : arrOrString
  return code
}

const useTokenEndpoint = (code: string) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(undefined)
  const [data, setData] = useState<
    { token: string; email: string } | undefined
  >(undefined)

  useEffect(() => {
    if (code == '') {
      setError('no code found :(')
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const req = await fetch('/oauth/token', {
          method: 'POST',
          body: JSON.stringify({
            code: code,
            redirectUri: 'http://localhost:3000/oauth',
          }),
        })
        const payload = (await req.json()) as {
          token: string
          email: string
        }
        setData(payload)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [code])

  return {
    data: data,
    loading: loading,
    error: error,
  }
}
