'use client'

import { useUser } from '@/auth/session'

export default function Page() {
  const user = useUser()
  return <div>email: {user.email}</div>
}
