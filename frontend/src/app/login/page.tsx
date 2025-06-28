'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  // Helper: get users from localStorage
  const getUsers = () => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem('mentorme_users') || '[]')
    } catch {
      return []
    }
  }

  // Helper: save users to localStorage
  const saveUsers = (users: any[]) => {
    localStorage.setItem('mentorme_users', JSON.stringify(users))
  }

  // Check if user exists when email changes
  useEffect(() => {
    if (email && !isLogin) {
      const users = getUsers()
      const userExists = users.find((u: any) => u.email === email)
      if (userExists) {
        setError('An account with this email already exists. Please sign in instead.')
        setIsLogin(true)
      } else {
        setError('')
      }
    }
  }, [email, isLogin])

  // Clear messages when switching modes
  const handleModeSwitch = (mode: 'login' | 'signup') => {
    setIsLogin(mode === 'login')
    setError('')
    setSuccess('')
    setEmail('')
    setPassword('')
    setName('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    if (isLogin) {
      // Sign In
      if (!email.trim() || !password.trim()) {
        setError('Please fill in all fields')
        setIsLoading(false)
        return
      }

      try {
        const success = await login(email, password)
        if (success) {
          setSuccess('Sign in successful! Redirecting...')
          setTimeout(() => {
            router.push('/')
          }, 1000)
        } else {
          setError('Invalid email or password. Please check your credentials.')
        }
      } catch (error) {
        setError('An error occurred during sign in. Please try again.')
      }
      setIsLoading(false)
    } else {
      // Sign Up
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all fields')
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long')
        setIsLoading(false)
        return
      }
      
      try {
        const users = getUsers()
        if (users.find((u: any) => u.email === email)) {
          setError('An account with this email already exists. Please sign in instead.')
          setIsLoading(false)
          return
        }
        
        // Add new user
        const newUser = { 
          name: name.trim(), 
          email: email.trim(), 
          password,
          createdAt: new Date().toISOString()
        }
        users.push(newUser)
        saveUsers(users)
        
        setSuccess('Account created successfully! Signing you in...')
        
        // Auto-login after signup
        setTimeout(async () => {
          const loginSuccess = await login(email, password)
          if (loginSuccess) {
            router.push('/')
          } else {
            setError('Account created but failed to sign in automatically. Please sign in manually.')
            setIsLogin(true)
          }
        }, 1500)
      } catch (error) {
        setError('An error occurred during sign up. Please try again.')
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#112022] dark group/design-root overflow-x-hidden" style={{fontFamily: 'Lexend, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#244347] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">MentorMe</h2>
          </div>
          <Link
            href="/"
            className="text-sm font-medium leading-normal text-white hover:text-[#90e9f5] transition-colors"
          >
            ← Back to Home
          </Link>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 justify-center items-center py-10">
          <div className="w-full max-w-md">
            {/* Login Card */}
            <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-2xl border border-[#336066] overflow-hidden shadow-2xl">
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-[#112022] text-2xl font-bold">
                      {isLogin ? '🔐' : '📝'}
                    </span>
                  </div>
                  <h1 className="text-white text-2xl font-bold mb-2">
                    {isLogin ? 'Welcome Back!' : 'Join MentorMe'}
                  </h1>
                  <p className="text-[#92c2c8] text-sm">
                    {isLogin 
                      ? 'Sign in to continue your learning journey' 
                      : 'Create your account to unlock your learning potential'
                    }
                  </p>
                </div>

                {/* Toggle Login/Signup */}
                <div className="flex justify-center mb-6">
                  <button
                    onClick={() => handleModeSwitch('login')}
                    className={`px-6 py-3 rounded-l-xl font-bold text-sm transition-all duration-300 ${
                      isLogin 
                        ? 'bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] shadow-lg' 
                        : 'bg-[#244347] text-white hover:bg-[#336066]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleModeSwitch('signup')}
                    className={`px-6 py-3 rounded-r-xl font-bold text-sm transition-all duration-300 ${
                      !isLogin 
                        ? 'bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] shadow-lg' 
                        : 'bg-[#244347] text-white hover:bg-[#336066]'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field (Sign Up only) */}
                  {!isLogin && (
                    <div>
                      <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-[#336066] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90e9f5] focus:border-transparent transition-all duration-300 bg-[#244347] text-white placeholder-[#92c2c8]"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  )}
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-[#336066] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90e9f5] focus:border-transparent transition-all duration-300 bg-[#244347] text-white placeholder-[#92c2c8]"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 border border-[#336066] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90e9f5] focus:border-transparent transition-all duration-300 bg-[#244347] text-white placeholder-[#92c2c8]"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#92c2c8] hover:text-[#90e9f5] transition-colors"
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {!isLogin && (
                      <p className="text-[#92c2c8] text-xs mt-1">Password must be at least 6 characters long</p>
                    )}
                  </div>

                  {/* Success Message */}
                  {success && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-green-400 text-sm">{success}</p>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] rounded-xl hover:from-[#64b5f6] hover:to-[#90e9f5] focus:outline-none focus:ring-2 focus:ring-[#90e9f5] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-[#112022] border-t-transparent rounded-full animate-spin"></div>
                        <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                      </span>
                    ) : (
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    )}
                  </button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-gradient-to-r from-[#244347] to-[#2a4a4e] rounded-lg border border-[#336066]">
                  <p className="text-[#90e9f5] text-xs mb-2 font-semibold">💡 How to get started:</p>
                  <p className="text-[#92c2c8] text-xs mb-2">
                    {isLogin 
                      ? 'Sign in with your existing account, or switch to Sign Up to create a new account.'
                      : 'Create a new account with any email and password. You\'ll be automatically signed in after registration.'
                    }
                  </p>
                  <p className="text-[#90e9f5] text-xs mb-2">
                    Example: demo@example.com / password123
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#336066]">
                    <a 
                      href="/test-login" 
                      className="text-[#90e9f5] text-xs hover:underline"
                    >
                      🔧 Test Login Functionality →
                    </a>
                  </div>
                </div>

                {/* Forgot Password */}
                {isLogin && (
                  <div className="mt-4 text-center">
                    <button className="text-[#92c2c8] text-sm hover:text-[#90e9f5] transition-colors">
                      Forgot your password?
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-[#92c2c8] text-xs">
                By continuing, you agree to our{' '}
                <Link href="#" className="text-[#90e9f5] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="#" className="text-[#90e9f5] hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 