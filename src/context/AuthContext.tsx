import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  phoneCode?: string
  avatar?: string
  isHost?: boolean
  joinedAt: string
  createdAt: string
  savedProperties: number[]
}

interface AuthContextType {
  user: User | null
  login: (name: string, identifier: string, isPhone: boolean) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, phone: string, phoneCode: string, password?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
  toggleFavorite: (propertyId: number) => void
  isFavorite: (propertyId: number) => boolean
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

  const getUsers = (): Array<{ user: User; password?: string }> => {
    try {
      const db = localStorage.getItem(STORAGE_KEYS.USERS)
      if (!db) return []
      return Array.isArray(JSON.parse(db)) ? JSON.parse(db) : Object.values(JSON.parse(db))
    } catch {
      return []
    }
  }

  const saveUsers = (users: Array<{ user: User; password?: string }>) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  }

  const login = async (name: string, identifier: string, isPhone: boolean): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers()
    const record = users.find(u => 
      u.user.name.toLowerCase() === name.toLowerCase() && 
      (isPhone ? u.user.phone === identifier : u.user.email === identifier.toLowerCase())
    )

    if (!record) {
      return { success: false, error: 'No account found with this Name and Email/Phone. Please sign up.' }
    }

    setUser(record.user)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(record.user))
    return { success: true }
  }

  const register = async (name: string, email: string, phone: string, phoneCode: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers()
    
    // Check if user exists by email or phone
    const exists = users.find(u => u.user.email === email.toLowerCase() || u.user.phone === phone)

    if (exists) {
      return { success: false, error: 'An account with this email/phone already exists. Please log in.' }
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase(),
      phone: phone.trim(),
      phoneCode: phoneCode,
      joinedAt: new Date().toISOString(),
      createdAt: new Date().toLocaleDateString(),
      savedProperties: []
    }

    users.push({ user: newUser, password })
    saveUsers(users)
    setUser(newUser)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser))
    return { success: true }
  }

  const toggleFavorite = (propertyId: number) => {
    if (!user) return

    const updatedUser = { ...user }
    if (!updatedUser.savedProperties) updatedUser.savedProperties = []
    
    const index = updatedUser.savedProperties.indexOf(propertyId)
    if (index === -1) {
      updatedUser.savedProperties.push(propertyId)
    } else {
      updatedUser.savedProperties.splice(index, 1)
    }

    setUser(updatedUser)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser))

    // Also update in the global users list
    const users = getUsers()
    const userIndex = users.findIndex(u => u.user.id === user.id)
    if (userIndex !== -1) {
      users[userIndex].user = updatedUser
      saveUsers(users)
    }
  }

  const isFavorite = (propertyId: number) => {
    return user?.savedProperties?.includes(propertyId) || false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, toggleFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
