'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  email: string
  name: string
  isAuthenticated: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Helper: get users from localStorage
  const getUsers = () => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem('mentorme_users') || '[]')
    } catch {
      return []
    }
  }

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
        const userEmail = localStorage.getItem('userEmail')
        const userName = localStorage.getItem('userName')
        
        if (isAuthenticated && userEmail && userName) {
          setUser({
            email: userEmail,
            name: userName,
            isAuthenticated: true
          })
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const users = getUsers()
      const user = users.find((u: any) => u.email === email && u.password === password)
      
      if (user) {
        const userData = {
          email: user.email,
          name: user.name,
          isAuthenticated: true
        }
        
        // Store in localStorage
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', user.email)
        localStorage.setItem('userName', user.name)
        
        setUser(userData)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    
    // Clear state
    setUser(null)
    
    // Redirect to login
    router.push('/login')
  }

  const value = {
    user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 