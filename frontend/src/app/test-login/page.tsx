'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function TestLoginPage() {
  const { user, login, logout, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')

  const handleTestLogin = async () => {
    setResult('Testing login...')
    const success = await login(email, password)
    setResult(success ? 'Login successful!' : 'Login failed!')
  }

  const handleTestLogout = () => {
    logout()
    setResult('Logged out!')
  }

  return (
    <div className="min-h-screen bg-[#112022] p-8">
      <div className="max-w-md mx-auto bg-[#1a2f32] rounded-lg p-6">
        <h1 className="text-white text-2xl mb-6">Login Test Page</h1>
        
        <div className="space-y-4">
          <div>
            <label className="text-white text-sm">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-[#244347] text-white rounded"
              placeholder="test@example.com"
            />
          </div>
          
          <div>
            <label className="text-white text-sm">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-[#244347] text-white rounded"
              placeholder="password123"
            />
          </div>
          
          <button
            onClick={handleTestLogin}
            className="w-full bg-[#90e9f5] text-[#112022] p-2 rounded font-bold"
          >
            Test Login
          </button>
          
          <button
            onClick={handleTestLogout}
            className="w-full bg-red-500 text-white p-2 rounded font-bold"
          >
            Test Logout
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-[#244347] rounded">
          <h3 className="text-white font-bold mb-2">Current State:</h3>
          <p className="text-[#90e9f5] text-sm">Loading: {isLoading ? 'Yes' : 'No'}</p>
          <p className="text-[#90e9f5] text-sm">User: {user ? `${user.name} (${user.email})` : 'None'}</p>
          <p className="text-[#90e9f5] text-sm">Result: {result}</p>
        </div>
        
        <div className="mt-4">
          <a href="/login" className="text-[#90e9f5] hover:underline">
            Go to Real Login Page
          </a>
        </div>
      </div>
    </div>
  )
} 