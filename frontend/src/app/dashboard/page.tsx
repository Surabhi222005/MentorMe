'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { findBackendPort } from '@/config/api'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'chat' | 'quiz' | 'upload' | 'history'>('chat')
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [quizTopic, setQuizTopic] = useState('')
  const [quizQuestions, setQuizQuestions] = useState<Array<{question: string, options: string[], correct: number}>>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{name: string, content: string, originalContent: string, fileType: string}>>([])
  const [backendUrl, setBackendUrl] = useState('')

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Find backend URL on component mount
  useEffect(() => {
    const initBackend = async () => {
      const url = await findBackendPort()
      setBackendUrl(url)
    }
    initBackend()
  }, [])

  if (!user) {
    return null
  }

  const handleChat = async () => {
    if (!message.trim() || !backendUrl) return
    
    setIsLoading(true)
    const userMessage = message
    setMessage('')
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }])
    
    try {
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })
      
      const data = await response.json()
      
      // Add AI response to chat
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Chat error:', error)
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const generateQuiz = async () => {
    if (!quizTopic.trim() || !backendUrl) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`${backendUrl}/api/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: quizTopic })
      })
      
      const data = await response.json()
      setQuizQuestions(data.questions || [])
      setCurrentQuestion(0)
      setScore(0)
      setShowResults(false)
    } catch (error) {
      console.error('Quiz generation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuizAnswer = (selectedOption: number) => {
    if (quizQuestions[currentQuestion].correct === selectedOption) {
      setScore(prev => prev + 1)
    }
    
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || !backendUrl) return
    
    setIsLoading(true)
    
    for (const file of Array.from(files)) {
      try {
        // Create FormData for file upload
        const formData = new FormData()
        formData.append('document', file)
        
        // Upload file to backend
        const response = await fetch(`${backendUrl}/api/upload-document`, {
          method: 'POST',
          body: formData
        })
        
        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        // Add uploaded file with AI-generated notes
        setUploadedFiles(prev => [...prev, { 
          name: file.name, 
          content: data.notes,
          originalContent: data.originalContent || '',
          fileType: data.fileType
        }])
        
        // Show success message
        alert(`✅ ${file.name} uploaded successfully! AI notes generated.`)
        
      } catch (error) {
        console.error('File upload error:', error)
        alert(`❌ Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
    
    setIsLoading(false)
    // Clear the file input
    event.target.value = ''
  }

  const clearUploadedFiles = () => {
    setUploadedFiles([])
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#112022] text-white">
        {/* Header */}
        <header className="bg-[#1a2f32] border-b border-[#244347] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/')}
                className="text-2xl font-bold text-[#90e9f5] hover:text-[#64b5f6] transition-colors cursor-pointer"
              >
                MentorMe Dashboard
              </button>
              <span className="text-gray-400">Welcome back, {user.name}! 👋</span>
            </div>
            
            {/* User Info and Logout */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#90e9f5] text-[#112022] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{user.name}</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-[#1a2f32] border-b border-[#244347] px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'chat'
                  ? 'border-[#90e9f5] text-[#90e9f5]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              🤖 AI Tutor Chat
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'quiz'
                  ? 'border-[#90e9f5] text-[#90e9f5]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              🎯 Quiz Generator
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'upload'
                  ? 'border-[#90e9f5] text-[#90e9f5]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              📝 Document Upload
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'history'
                  ? 'border-[#90e9f5] text-[#90e9f5]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              📚 Learning History
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* AI Tutor Chat */}
          {activeTab === 'chat' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#1a2f32] rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-[#90e9f5] mb-4">🤖 AI Tutor Chat</h2>
                <p className="text-gray-400 mb-6">
                  Ask me anything! I'm here to help you learn and understand any topic.
                </p>
                
                {/* Chat History */}
                <div className="bg-[#112022] rounded-lg p-4 h-96 overflow-y-auto mb-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <div className="text-4xl mb-4">🤖</div>
                      <p>Start a conversation with your AI tutor!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatHistory.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.role === 'user'
                                ? 'bg-[#90e9f5] text-[#112022]'
                                : 'bg-[#244347] text-white'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-[#244347] text-white px-4 py-2 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#90e9f5]"></div>
                              Thinking...
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Message Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-[#112022] border border-[#244347] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#90e9f5]"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleChat}
                    disabled={isLoading || !message.trim()}
                    className="bg-[#90e9f5] text-[#112022] px-6 py-2 rounded-lg font-medium hover:bg-[#64b5f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Generator */}
          {activeTab === 'quiz' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#1a2f32] rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#90e9f5] mb-4">🎯 Quiz Generator</h2>
                
                {quizQuestions.length === 0 ? (
                  <div>
                    <p className="text-gray-400 mb-6">
                      Generate a quiz on any topic to test your knowledge!
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={quizTopic}
                        onChange={(e) => setQuizTopic(e.target.value)}
                        placeholder="Enter a topic (e.g., JavaScript, Math, History)..."
                        className="flex-1 bg-[#112022] border border-[#244347] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#90e9f5]"
                      />
                      <button
                        onClick={generateQuiz}
                        disabled={isLoading || !quizTopic.trim()}
                        className="bg-[#90e9f5] text-[#112022] px-6 py-2 rounded-lg font-medium hover:bg-[#64b5f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Generating...' : 'Generate Quiz'}
                      </button>
                    </div>
                  </div>
                ) : showResults ? (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#90e9f5] mb-4">Quiz Results</h3>
                    <div className="text-4xl mb-4">🎉</div>
                    <p className="text-xl text-white mb-2">
                      You scored {score} out of {quizQuestions.length}!
                    </p>
                    <p className="text-gray-400 mb-6">
                      {score === quizQuestions.length ? 'Perfect score! Amazing job!' : 
                       score >= quizQuestions.length * 0.8 ? 'Great job! You know this topic well!' :
                       score >= quizQuestions.length * 0.6 ? 'Good effort! Keep studying!' :
                       'Keep practicing! You\'ll get better!'}
                    </p>
                    <button
                      onClick={() => {
                        setQuizQuestions([])
                        setQuizTopic('')
                        setShowResults(false)
                      }}
                      className="bg-[#90e9f5] text-[#112022] px-6 py-2 rounded-lg font-medium hover:bg-[#64b5f6] transition-colors"
                    >
                      Take Another Quiz
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <p className="text-gray-400">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </p>
                    </div>
                    <div className="bg-[#112022] rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-white mb-6">
                        {quizQuestions[currentQuestion].question}
                      </h3>
                      <div className="space-y-3">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuizAnswer(index)}
                            className="w-full text-left bg-[#244347] hover:bg-[#90e9f5] hover:text-[#112022] px-4 py-3 rounded-lg transition-colors"
                          >
                            {String.fromCharCode(65 + index)}. {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Document Upload */}
          {activeTab === 'upload' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#1a2f32] rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#90e9f5] mb-4">📝 Document Upload</h2>
                <p className="text-gray-400 mb-6">
                  Upload documents to get AI-generated simplified notes and explanations.
                </p>
                
                <div className="border-2 border-dashed border-[#244347] rounded-lg p-8 text-center mb-6">
                  <div className="text-4xl mb-4">📄</div>
                  <p className="text-gray-400 mb-4">
                    Drag and drop files here, or click to select files
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supported formats: .txt, .pdf, .doc, .docx, .md, .csv, .xlsx, images, audio
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".txt,.pdf,.doc,.docx,.md,.csv,.xlsx,.jpg,.jpeg,.png,.gif,.mp3,.wav,.mp4"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`bg-[#90e9f5] text-[#112022] px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#64b5f6]'
                    }`}
                  >
                    {isLoading ? 'Uploading...' : 'Choose Files'}
                  </label>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">📚 AI-Generated Notes:</h3>
                      <button
                        onClick={clearUploadedFiles}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="bg-[#112022] rounded-lg p-6 border border-[#244347]">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-[#90e9f5] font-medium text-lg">{file.name}</p>
                              <p className="text-gray-400 text-sm">{file.fileType}</p>
                            </div>
                            <div className="text-[#90e9f5] text-sm">
                              AI Notes Generated ✅
                            </div>
                          </div>
                          
                          <div className="bg-[#1a2f32] rounded-lg p-4 mb-4">
                            <h4 className="text-white font-semibold mb-3">🤖 AI-Generated Notes:</h4>
                            <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                              {file.content}
                            </div>
                          </div>
                          
                          {file.originalContent && (
                            <details className="bg-[#1a2f32] rounded-lg p-4">
                              <summary className="text-white font-semibold cursor-pointer hover:text-[#90e9f5]">
                                📄 View Original Content (First 500 characters)
                              </summary>
                              <div className="text-gray-400 text-sm mt-2 whitespace-pre-wrap">
                                {file.originalContent}
                              </div>
                            </details>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Learning History */}
          {activeTab === 'history' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#1a2f32] rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#90e9f5] mb-4">📚 Learning History</h2>
                <p className="text-gray-400 mb-6">
                  Track your learning progress and review past conversations.
                </p>
                
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <p>Your learning history will appear here as you use the platform.</p>
                  <p className="text-sm mt-2">Start chatting or taking quizzes to build your history!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
} 