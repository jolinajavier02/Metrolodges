import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isHost?: boolean
  joinedAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEYS = {
  USERS: 'metrolodges_users',
  CURRENT_USER: 'metrolodges_current_user',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load current user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
      }
    }
    setIsLoading(false)
  }, [])

  const getUsers = (): Record<string, { user: User; password: string }> => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}')
    } catch {
      return {}
    }
  }

  const saveUsers = (users: Record<string, { user: User; password: string }>) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers()
    const key = email.toLowerCase()
    const record = users[key]

    if (!record) {
      return { success: false, error: 'No account found with this email. Please sign up.' }
    }
    if (record.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' }
    }

    setUser(record.user)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(record.user))
    return { success: true }
  }

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers()
    const key = email.toLowerCase()

    if (users[key]) {
      return { success: false, error: 'An account with this email already exists. Please log in.' }
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase(),
      joinedAt: new Date().toISOString(),
    }

    users[key] = { user: newUser, password }
    saveUsers(users)
    setUser(newUser)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
