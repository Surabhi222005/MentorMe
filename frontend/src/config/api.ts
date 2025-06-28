// API Configuration for MentorMe
const API_CONFIG = {
  // Base URL for API calls - use Render.com URL for production
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://mentorme-wa2h.onrender.com',
  
  // API endpoints
  ENDPOINTS: {
    CHAT: '/api/chat',
    CHAT_WITH_ATTACHMENT: '/api/chat-with-attachment',
    QUIZ: '/api/quiz',
    UPLOAD: '/api/upload',
    HEALTH: '/api/health',
    HISTORY: '/api/history'
  },
  
  // Timeout settings
  TIMEOUT: 30000, // 30 seconds
  
  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Function to check if backend is available
export const checkBackendHealth = async (): Promise<{ available: boolean; port?: number }> => {
  try {
    const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.HEALTH), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return { available: true, port: data.port };
    }
  } catch (error) {
    console.warn('Backend health check failed:', error);
  }
  
  return { available: false };
};

// Function to find available backend port
export const findBackendPort = async (): Promise<string> => {
  const ports = [5000, 5001, 5002, 5003, 5004, 5005];
  
  for (const port of ports) {
    try {
      const response = await fetch(`http://localhost:${port}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        console.log(`✅ Backend found on port ${port}`);
        return `http://localhost:${port}`;
      }
    } catch (error) {
      // Continue to next port
    }
  }
  
  // Fallback to default
  console.warn('⚠️ Backend not found on any port, using default');
  return API_CONFIG.BASE_URL;
};

// Export configuration
export default API_CONFIG; 