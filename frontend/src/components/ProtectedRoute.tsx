'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-[#112022] dark group/design-root overflow-x-hidden" style={{fontFamily: 'Lexend, "Noto Sans", sans-serif'}}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#90e9f5] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#112022] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-white text-lg font-medium">Loading MentorMe...</p>
          </div>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render children (will redirect to login)
  if (!user) {
    return null
  }

  // If authenticated, render children
  return <>{children}</>
} 