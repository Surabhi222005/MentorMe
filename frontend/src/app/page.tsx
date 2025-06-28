'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function LandingPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<'hero' | 'features' | 'about' | 'ai-tutor' | 'smart-notes' | 'quiz'>('hero')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const goToHome = () => {
    router.push('/')
  }

  return (
      <div className="relative flex size-full min-h-screen flex-col bg-[#112022] dark group/design-root overflow-x-hidden" style={{fontFamily: 'Lexend, "Noto Sans", sans-serif'}}>
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#244347] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <button 
              onClick={goToHome}
              className="text-white text-lg font-bold leading-tight tracking-[-0.015em] hover:text-[#90e9f5] transition-colors cursor-pointer"
            >
              MentorMe
            </button>
          </div>
        <div className="flex items-center gap-6">
              <button onClick={() => setActiveSection('hero')} className={`text-sm font-medium leading-normal transition-colors ${activeSection === 'hero' ? 'text-[#90e9f5]' : 'text-white hover:text-[#90e9f5]'}`}>Home</button>
          <button onClick={() => setActiveSection('features')} className={`text-sm font-medium leading-normal transition-colors ${activeSection === 'features' ? 'text-[#90e9f5]' : 'text-white hover:text-[#90e9f5]'}`}>Features</button>
          <button onClick={() => setActiveSection('about')} className={`text-sm font-medium leading-normal transition-colors ${activeSection === 'about' ? 'text-[#90e9f5]' : 'text-white hover:text-[#90e9f5]'}`}>About</button>
          
          {user ? (
            <div className="flex items-center gap-4 border-l border-[#244347] pl-6">
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 bg-[#1a2f32] hover:bg-[#244347] px-4 py-2 rounded-lg transition-colors"
                >
                  <div className="bg-[#90e9f5] text-[#112022] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white text-sm font-medium">{user.name}</span>
                  <svg className={`w-4 h-4 text-white transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-[#1a2f32] border border-[#244347] rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          logout()
                          setShowDropdown(false)
                        }}
                        className="w-full text-left px-4 py-2 text-white hover:bg-[#244347] transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 border-l border-[#244347] pl-6">
              <Link href="/login" className="text-white hover:text-[#90e9f5] transition-colors text-sm font-medium">
                Sign In
              </Link>
              <Link href="/login" className="bg-[#90e9f5] text-[#112022] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#64b5f6] transition-colors">
                Get Started
              </Link>
            </div>
          )}
          </div>
        </header>
        
        {/* Hero Section */}
        {activeSection === 'hero' && (
          <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Hero Content with Image */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left Content */}
              <div className="text-left">
                <div className="mb-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] bg-clip-text text-transparent">
                    MentorMe
                  </span>
                </h1>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Your AI-powered learning companion that adapts to your style and helps you master any subject! 🚀
                </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {user ? (
                      <button className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] px-8 py-4 rounded-lg font-semibold hover:from-[#64b5f6] hover:to-[#90e9f5] transition-all transform hover:scale-105 shadow-lg text-center">
                        Welcome back, {user.name}! 🎉
                      </button>
                    ) : (
                      <Link href="/login" className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] px-8 py-4 rounded-lg font-semibold hover:from-[#64b5f6] hover:to-[#90e9f5] transition-all transform hover:scale-105 shadow-lg text-center">
                  Start Learning Now! 🚀
                      </Link>
                    )}
                    <button onClick={() => setActiveSection('features')} className="border border-[#90e9f5] text-[#90e9f5] px-8 py-4 rounded-lg font-semibold hover:bg-[#90e9f5] hover:text-[#112022] transition-all">
                  Explore Features ✨
                </button>
              </div>
            </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6 mt-12">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#90e9f5]">500+</div>
                    <div className="text-gray-400 text-sm">Students Helped</div>
            </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#90e9f5]">50+</div>
                    <div className="text-gray-400 text-sm">Subjects Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#90e9f5]">24/7</div>
                    <div className="text-gray-400 text-sm">AI Support</div>
                  </div>
                </div>
                </div>
              
              {/* Right - Hero Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-2xl p-8 border border-[#90e9f5]/20 shadow-2xl">
                  <div className="relative">
                    {/* Main Illustration */}
                    <div className="bg-gradient-to-br from-[#90e9f5]/10 to-[#64b5f6]/10 rounded-xl p-8 mb-6">
                      <div className="text-center">
                        <div className="text-8xl mb-4">🤖</div>
                        <div className="text-4xl mb-2">📚</div>
                        <div className="text-3xl">💡</div>
            </div>
          </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 bg-[#90e9f5] text-[#112022] rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                      AI
                      </div>
                    <div className="absolute -bottom-4 -left-4 bg-[#64b5f6] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-lg">
                      ML
                          </div>
                    <div className="absolute top-1/2 -right-8 bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] rounded-lg px-3 py-1 text-xs font-bold shadow-lg">
                      Smart Learning
                    </div>
                  </div>
                </div>
                      </div>
                    </div>
                    
            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              <button 
                onClick={() => setActiveSection('ai-tutor')}
                className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-8 border border-[#244347] hover:border-[#90e9f5] transition-all duration-300 transform hover:scale-105 shadow-lg text-left w-full"
              >
                <div className="text-4xl mb-6 text-center">🤖</div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">AI Tutor Chat</h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Get instant help with any question, upload documents, and have interactive conversations with your personalized AI tutor
                </p>
                <div className="mt-6 text-center">
                  <span className="text-[#90e9f5] font-medium">
                    Click to explore →
                  </span>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveSection('smart-notes')}
                className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-8 border border-[#244347] hover:border-[#90e9f5] transition-all duration-300 transform hover:scale-105 shadow-lg text-left w-full"
              >
                <div className="text-4xl mb-6 text-center">📝</div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">Smart Notes</h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Upload any document and get simplified, easy-to-understand notes instantly. Perfect for studying and revision
                </p>
                <div className="mt-6 text-center">
                  <span className="text-[#90e9f5] font-medium">
                    Click to explore →
                  </span>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveSection('quiz')}
                className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-8 border border-[#244347] hover:border-[#90e9f5] transition-all duration-300 transform hover:scale-105 shadow-lg text-left w-full"
              >
                <div className="text-4xl mb-6 text-center">🎯</div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">Quiz Generator</h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Test your knowledge with AI-generated quizzes tailored to your learning progress and subject matter
                </p>
                <div className="mt-6 text-center">
                  <span className="text-[#90e9f5] font-medium">
                    Click to explore →
                  </span>
                </div>
              </button>
            </div>

            {/* How It Works Section */}
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-12">How It Works 🚀</h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-[#90e9f5] text-[#112022] rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Create Account</h3>
                  <p className="text-gray-400 text-sm">Sign up for free and start your learning journey</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#90e9f5] text-[#112022] rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Ask Questions</h3>
                  <p className="text-gray-400 text-sm">Start a conversation with your AI tutor about any topic</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#90e9f5] text-[#112022] rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Upload Documents</h3>
                  <p className="text-gray-400 text-sm">Share your study materials for personalized analysis</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#90e9f5] text-[#112022] rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Test Knowledge</h3>
                  <p className="text-gray-400 text-sm">Take quizzes to reinforce your learning</p>
            </div>
          </div>
            </div>

            {/* Testimonials Section */}
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold text-white mb-12">What Students Say 💬</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-6 border border-[#244347] hover:border-[#90e9f5] transition-all duration-300">
                  <div className="text-3xl mb-4">⭐</div>
                  <p className="text-gray-300 text-sm mb-4 italic">
                    "MentorMe helped me understand complex topics in minutes. The AI tutor is incredibly patient and explains everything so clearly!"
                  </p>
                  <div className="text-[#90e9f5] font-semibold">- Sarah K.</div>
                  <div className="text-gray-500 text-xs">Computer Science Student</div>
                </div>
                
                <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-6 border border-[#244347] hover:border-[#90e9f5] transition-all duration-300">
                  <div className="text-3xl mb-4">⭐</div>
                  <p className="text-gray-300 text-sm mb-4 italic">
                    "The document upload feature is amazing! I can upload my textbooks and get simplified notes instantly. It's like having a personal tutor!"
                  </p>
                  <div className="text-[#90e9f5] font-semibold">- Mike R.</div>
                  <div className="text-gray-500 text-xs">Engineering Student</div>
                </div>

                <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-6 border border-[#244347] hover:border-[#90e9f5] transition-all duration-300">
                  <div className="text-3xl mb-4">⭐</div>
                  <p className="text-gray-300 text-sm mb-4 italic">
                    "The quiz generator is perfect for exam prep. It creates questions based on what I'm actually studying. Highly recommended!"
                  </p>
                  <div className="text-[#90e9f5] font-semibold">- Emma L.</div>
                  <div className="text-gray-500 text-xs">Medical Student</div>
                            </div>
                          </div>
                        </div>
                        
            {/* Final CTA */}
            <div className="mt-20 text-center">
              <div className="bg-gradient-to-r from-[#1a2f32] to-[#244347] rounded-2xl p-12 border border-[#90e9f5]/20">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Learning? 🚀</h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Join thousands of students who are already learning smarter with MentorMe
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user ? (
                    <Link href="/dashboard" className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] px-10 py-4 rounded-lg font-bold text-lg hover:from-[#64b5f6] hover:to-[#90e9f5] transition-all transform hover:scale-105 shadow-lg">
                      Go to Dashboard 🎓
                    </Link>
                  ) : (
                    <Link href="/login" className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] px-10 py-4 rounded-lg font-bold text-lg hover:from-[#64b5f6] hover:to-[#90e9f5] transition-all transform hover:scale-105 shadow-lg">
                      Start Your Journey Now! 🎓
                    </Link>
                  )}
                </div>
                            </div>
                          </div>
                        </div>
                      </div>
      )}

      {/* Features Section */}
      {activeSection === 'features' && (
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-white mb-6">Our Features</h1>
              <p className="text-xl text-gray-300">Discover what makes MentorMe the perfect learning companion</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature cards with login prompts */}
              <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-8 border border-[#244347] hover:border-[#90e9f5] transition-all duration-300">
                <div className="text-5xl mb-6 text-center">🤖</div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">AI Tutor Chat</h3>
                <p className="text-gray-400 text-center mb-6">
                  Get instant help with any question. Our AI tutor adapts to your learning style and provides personalized explanations.
                </p>
                {user ? (
                  <Link href="/dashboard" className="block w-full bg-[#90e9f5] text-[#112022] py-3 rounded-lg font-semibold text-center hover:bg-[#64b5f6] transition-colors">
                    Start Chatting
                  </Link>
                ) : (
                  <Link href="/login" className="block w-full bg-[#90e9f5] text-[#112022] py-3 rounded-lg font-semibold text-center hover:bg-[#64b5f6] transition-colors">
                    Sign In to Chat
                  </Link>
                )}
              </div>

              <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-8 border border-[#244347] hover:border-[#90e9f5] transition-all duration-300">
                <div className="text-5xl mb-6 text-center">📝</div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">Smart Notes</h3>
                <p className="text-gray-400 text-center mb-6">
                  Upload any document and get simplified, easy-to-understand notes instantly. Perfect for studying and revision.
                </p>
                {user ? (
                  <Link href="/dashboard" className="block w-full bg-[#90e9f5] text-[#112022] py-3 rounded-lg font-semibold text-center hover:bg-[#64b5f6] transition-colors">
                    Upload Documents
                  </Link>
                ) : (
                  <Link href="/login" className="block w-full bg-[#90e9f5] text-[#112022] py-3 rounded-lg font-semibold text-center hover:bg-[#64b5f6] transition-colors">
                    Sign In to Upload
                  </Link>
                )}
                  </div>

              <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-8 border border-[#244347] hover:border-[#90e9f5] transition-all duration-300">
                <div className="text-5xl mb-6 text-center">🎯</div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">Quiz Generator</h3>
                <p className="text-gray-400 text-center mb-6">
                  Test your knowledge with AI-generated quizzes tailored to your learning progress and subject matter.
                </p>
                {user ? (
                  <Link href="/dashboard" className="block w-full bg-[#90e9f5] text-[#112022] py-3 rounded-lg font-semibold text-center hover:bg-[#64b5f6] transition-colors">
                    Take Quiz
                  </Link>
                ) : (
                  <Link href="/login" className="block w-full bg-[#90e9f5] text-[#112022] py-3 rounded-lg font-semibold text-center hover:bg-[#64b5f6] transition-colors">
                    Sign In for Quiz
                  </Link>
                )}
              </div>
              </div>
            </div>
          </div>
        )}

      {/* About Section */}
      {activeSection === 'about' && (
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-8">About MentorMe</h1>
            <p className="text-xl text-gray-300 mb-8">
              MentorMe is an AI-powered learning platform designed to make education more accessible, 
              engaging, and personalized for every student.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300">
                  To democratize education by providing personalized AI tutoring that adapts to each student's 
                  unique learning style and pace.
                </p>
                    </div>
              <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-300">
                  A world where every student has access to a personal AI tutor that helps them unlock 
                  their full learning potential.
                </p>
              </div>
              </div>
            </div>
          </div>
        )}

      {/* AI Tutor Section */}
      {activeSection === 'ai-tutor' && (
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-6xl mb-6">🤖</div>
              <h1 className="text-4xl font-bold text-white mb-6">AI Tutor Chat</h1>
              <p className="text-xl text-gray-300 mb-8">
                Get instant help with any question. Our AI tutor adapts to your learning style and provides personalized explanations.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-2xl p-8 border border-[#244347]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">How it works:</h3>
                  <ul className="text-gray-300 space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                      Ask any question about your subject
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                      Get instant, personalized explanations
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                      Upload documents for context-aware help
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                      Continue the conversation naturally
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#90e9f5]/10 to-[#64b5f6]/10 rounded-xl p-8 mb-6">
                    <div className="text-8xl mb-4">💬</div>
                    <p className="text-white font-semibold">Interactive Learning</p>
                  </div>
                  {user ? (
                    <Link href="/dashboard" className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] px-8 py-4 rounded-lg font-bold text-lg hover:from-[#64b5f6] hover:to-[#90e9f5] transition-all transform hover:scale-105 shadow-lg">
                      Start Chatting Now
                    </Link>
                  ) : (
                    <Link href="/login" className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] px-8 py-4 rounded-lg font-bold text-lg hover:from-[#64b5f6] hover:to-[#90e9f5] transition-all transform hover:scale-105 shadow-lg">
                      Sign In to Start
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={() => setActiveSection('hero')}
                className="text-[#90e9f5] hover:text-[#64b5f6] transition-colors font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Smart Notes Section */}
      {activeSection === 'smart-notes' && (
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-6xl mb-6">📝</div>
              <h1 className="text-4xl font-bold text-white mb-6">Smart Notes</h1>
              <p className="text-xl text-gray-300 mb-8">
                Upload any document and get simplified, easy-to-understand notes instantly. Perfect for studying and revision.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-2xl p-8 border border-[#244347]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">How it works:</h3>
                  <ul className="text-gray-300 space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                      Upload your documents (PDF, Word, Text)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                      AI analyzes and extracts key information
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                      Get simplified, easy-to-understand notes
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                      Perfect for quick revision and study sessions
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#90e9f5]/10 to-[#64b5f6]/10 rounded-xl p-8 mb-6">
                    <div className="text-8xl mb-4">📚</div>
                    <p className="text-white font-semibold">Smart Summaries</p>
                  </div>
                  {user ? (
                    <Link href="/dashboard" className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] px-8 py-4 rounded-lg font-bold text-lg hover:from-[#64b5f6] hover:to-[#90e9f5] transition-all transform hover:scale-105 shadow-lg">
                      Upload Documents
                    </Link>
                  ) : (
                    <Link href="/login" className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] px-8 py-4 rounded-lg font-bold text-lg hover:from-[#64b5f6] hover:to-[#90e9f5] transition-all transform hover:scale-105 shadow-lg">
                      Sign In to Upload
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={() => setActiveSection('hero')}
                className="text-[#90e9f5] hover:text-[#64b5f6] transition-colors font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Generator Section */}
      {activeSection === 'quiz' && (
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-6xl mb-6">🎯</div>
              <h1 className="text-4xl font-bold text-white mb-6">Quiz Generator</h1>
              <p className="text-xl text-gray-300 mb-8">
                Test your knowledge with AI-generated quizzes tailored to your learning progress and subject matter.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-2xl p-8 border border-[#244347]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">How it works:</h3>
                  <ul className="text-gray-300 space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                      Choose your topic or subject
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                      AI generates personalized questions
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                      Answer multiple choice questions
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="bg-[#90e9f5] text-[#112022] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                      Get instant feedback and explanations
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#90e9f5]/10 to-[#64b5f6]/10 rounded-xl p-8 mb-6">
                    <div className="text-8xl mb-4">🧠</div>
                    <p className="text-white font-semibold">Test Your Knowledge</p>
                  </div>
                  {user ? (
                    <Link href="/dashboard" className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] px-8 py-4 rounded-lg font-bold text-lg hover:from-[#64b5f6] hover:to-[#90e9f5] transition-all transform hover:scale-105 shadow-lg">
                      Take a Quiz
                    </Link>
                  ) : (
                    <Link href="/login" className="bg-gradient-to-r from-[#90e9f5] to-[#64b5f6] text-[#112022] px-8 py-4 rounded-lg font-bold text-lg hover:from-[#64b5f6] hover:to-[#90e9f5] transition-all transform hover:scale-105 shadow-lg">
                      Sign In for Quiz
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={() => setActiveSection('hero')}
                className="text-[#90e9f5] hover:text-[#64b5f6] transition-colors font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      {activeSection === 'about' && (
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-8">About MentorMe</h1>
            <p className="text-xl text-gray-300 mb-8">
              MentorMe is an AI-powered learning platform designed to make education more accessible, 
              engaging, and personalized for every student.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300">
                  To democratize education by providing personalized AI tutoring that adapts to each student's 
                  unique learning style and pace.
                </p>
                    </div>
              <div className="bg-gradient-to-br from-[#1a2f32] to-[#244347] rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-300">
                  A world where every student has access to a personal AI tutor that helps them unlock 
                  their full learning potential.
                </p>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
  )
} 