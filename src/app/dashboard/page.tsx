'use client'

import { useUser } from '@/auth/session'

export default function Page() {
  const user = useUser()
  if (!user) {
    return <div>loading...</div>
  }

  return (
    <>
      <div>email: {user?.email}</div>
      {user.image ? <img src={user.image} alt="profile" /> : null}
    </>
  )
}
