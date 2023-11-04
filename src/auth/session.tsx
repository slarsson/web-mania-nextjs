'use client'

import { redirect } from 'next/navigation'
import React, { createContext, useContext } from 'react'
import Cookies from 'js-cookie'
import { decode } from './jwt'

export const SESSION_COOKIE = 'session'

const UserContext = createContext<{ email: string } | undefined>(undefined)

export const useUser = () => {
  const user = useContext(UserContext)
  if (!user) {
    redirect('/')
  }
  return user
}

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  let user: { email: string } | undefined = undefined

  const jwt = Cookies.get(SESSION_COOKIE)

  if (jwt) {
    const payload = decode(jwt)
    user = {
      email: payload.email,
    }
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
