'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { decode } from './jwt'
import { SESSION_COOKIE } from './auth'

export type User = {
  email: string
  image: string | undefined
}

// TODO: add error
const UserContext = createContext<{
  user: User | undefined
  setUser: () => void
}>({ user: undefined, setUser: () => {} })

export const useUser = () => {
  const ctx = useContext(UserContext)

  useEffect(() => {
    if (!ctx.user) {
      ctx.setUser()
    }
  }, [ctx])

  return ctx.user
}

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | undefined>(undefined)

  const fromCookie = () => {
    const jwt = Cookies.get(SESSION_COOKIE)
    if (jwt) {
      const payload = decode(jwt)
      setUser({
        email: payload.email,
        image: payload.image,
      })
    }
  }

  useEffect(() => {
    if (!user) {
      fromCookie()
    }
  }, [user])

  const value = {
    user: user,
    setUser: () => fromCookie(),
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
