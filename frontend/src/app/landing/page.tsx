'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LandingPage() {
  const router = useRouter() 

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
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-white text-sm font-medium leading-normal hover:text-[#90e9f5] transition-colors" href="#features">Features</a>
              <a className="text-white text-sm font-medium leading-normal hover:text-[#90e9f5] transition-colors" href="#about">About</a>
              <a className="text-white text-sm font-medium leading-normal hover:text-[#90e9f5] transition-colors" href="#contact">Contact</a>
            </div>
            <button
              onClick={() => router.push('/login')}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#90e9f5] text-[#112022] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#7dd8e4] transition-colors"
            >
              <span className="truncate">Get Started</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            {/* Hero Section */}
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                  style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYNAp3Y53JkFQ2-gRWQzCOaWEqxnWPpH9qlZY6j1WN9uW9kcSCDTvcShFJBAp4FW8c_BsNW8loxTnoNVAsVGq3TXoAxo6TEa8Zs4Kgb2_8MIiYJq01drTRGw9uiH7ISAb0Xy4FR85VGzQP07n_RGPvLyN_r5zAYwgnCE0knsplVP8YZ0lsTzZphB1X5WUotF71E30k6nLP5MFPlT6JDq3GobnhgQ2DSK29EfwVyxW1H58TL3Bf9rvY-9JmqQVe7Dy8uXTBK4MhU2VK")'}}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Unlock Your Learning Potential
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Transform your study notes into interactive flashcards and discover effortless learning techniques with MentorMe.
                    </h2>
                  </div>
                  <button
                    onClick={() => router.push('/login')}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#90e9f5] text-[#112022] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-[#7dd8e4] transition-colors"
                  >
                    <span className="truncate">Start Learning</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div id="features" className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  Key Features
                </h1>
                <p className="text-white text-base font-normal leading-normal max-w-[720px]">Explore the tools that make learning easier and more effective.</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#336066] bg-[#1a3033] p-4 flex-col hover:border-[#90e9f5] transition-colors">
                  <div className="text-white" data-icon="Cards" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M184,72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V88A16,16,0,0,0,184,72Zm0,128H40V88H184V200ZM232,56V176a8,8,0,0,1-16,0V56H64a8,8,0,0,1,0-16H216A16,16,0,0,1,232,56Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">AI Tutor Chat</h2>
                    <p className="text-[#92c2c8] text-sm font-normal leading-normal">Get instant explanations and help with any topic through our intelligent AI tutor.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#336066] bg-[#1a3033] p-4 flex-col hover:border-[#90e9f5] transition-colors">
                  <div className="text-white" data-icon="Lightbulb" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">Quiz Generator</h2>
                    <p className="text-[#92c2c8] text-sm font-normal leading-normal">Generate interactive quizzes on any topic to test your knowledge and reinforce learning.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div id="about" className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  About MentorMe
                </h1>
                <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                  MentorMe is an AI-powered learning platform designed to make education more accessible,
                  engaging, and effective. Our intelligent AI tutor provides personalized explanations,
                  generates interactive quizzes, and adapts to your learning style.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="@container">
              <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                    Ready to Elevate Your Learning?
                  </h1>
                  <p className="text-white text-base font-normal leading-normal max-w-[720px]">Join thousands of students who are achieving their academic goals with MentorMe.</p>
                </div>
                <div className="flex flex-1 justify-center">
                  <div className="flex justify-center">
                    <button
                      onClick={() => router.push('/login')}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#90e9f5] text-[#112022] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] grow hover:bg-[#7dd8e4] transition-colors"
                    >
                      <span className="truncate">Get Started</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div id="contact" className="flex flex-col gap-6 px-4 py-10 border-t border-[#244347]">
              <div className="flex flex-col gap-4">
                <h1 className="text-white tracking-light text-[24px] font-bold leading-tight max-w-[720px]">
                  Contact Us
                </h1>
                <p className="text-[#92c2c8] text-sm font-normal leading-normal max-w-[720px]">
                  Have questions or feedback? We'd love to hear from you.
                </p>
              </div>
              <div className="flex items-center gap-4 text-[#92c2c8] text-sm">
                <span>© 2024 MentorMe. All rights reserved.</span>
                <span>•</span>
                <Link href="#" className="hover:text-[#90e9f5] transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link href="#" className="hover:text-[#90e9f5] transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 