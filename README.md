# MentorMe - AI-Powered Learning Buddy

A full-stack web application featuring an AI chatbot tutor and quiz generator powered by Groq's fast AI inference platform.

## Features

- **AI Tutor Chat**: Ask questions about any topic and get detailed explanations
- **Quiz Generator**: Generate multiple-choice quizzes on any subject
- **Modern UI**: Beautiful, responsive interface built with Next.js and TailwindCSS
- **Real-time Interaction**: Instant responses from Groq's Llama3 model
- **Fast Performance**: Powered by Groq's ultra-fast inference engine

## Tech Stack

### Backend
- Node.js
- Express.js
- Groq API (Llama3-8b-8192)
- CORS for cross-origin requests

### Frontend
- Next.js 14
- TypeScript
- TailwindCSS
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Groq API key

## Setup Instructions

### 1. Clone and Navigate
```bash
cd MentorMe
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```bash
cp env.example .env
```

Edit `.env` and add your Groq API key:
```
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start the Application

#### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

## Usage

### AI Tutor Chat
1. Click on the "AI Tutor Chat" tab
2. Enter any topic you want to learn about
3. Click "Ask" to get an AI-generated explanation
4. Continue the conversation by asking follow-up questions

### Quiz Generator
1. Click on the "Quiz Generator" tab
2. Enter a topic for quiz generation
3. Click "Generate Quiz" to create 3 multiple-choice questions
4. Select your answers
5. Click "Check Answers" to see your score
6. Click "New Quiz" to generate another quiz

## API Endpoints

### Chat Endpoint
- **POST** `/api/chat`
- **Body**: `{ "topic": "your topic here" }`
- **Response**: `{ "success": true, "explanation": "...", "topic": "..." }`

### Quiz Endpoint
- **POST** `/api/quiz`
- **Body**: `{ "topic": "your topic here" }`
- **Response**: `{ "success": true, "questions": [...], "topic": "..." }`

### Health Check
- **GET** `/api/health`
- **Response**: `{ "status": "OK", "message": "MentorMe backend is running", "provider": "Groq", "model": "llama3-8b-8192" }`

## Project Structure

```
MentorMe/
├── backend/
│   ├── server.js          # Express server with API routes
│   ├── package.json       # Backend dependencies
│   └── env.example        # Environment variables template
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx   # Main Next.js page component
│   │       ├── layout.tsx # Root layout component
│   │       └── globals.css # Global styles with TailwindCSS
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.ts # TailwindCSS configuration
│   ├── next.config.js     # Next.js configuration
│   └── tsconfig.json      # TypeScript configuration
├── start.bat              # Quick start script
└── README.md
```

## Getting Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env` file

## Why Groq?

- **Speed**: Ultra-fast inference with sub-second response times
- **Cost-Effective**: More affordable than many other AI providers
- **Quality**: Powered by Meta's Llama3 model for high-quality responses
- **Reliability**: Enterprise-grade infrastructure and uptime
- **No Rate Limits**: Generous usage limits for development and production

## Customization

### Styling
- Modify `frontend/tailwind.config.ts` to customize colors and theme
- Update `frontend/src/app/globals.css` for additional custom styles

### AI Model
- Change the model in `backend/server.js` (currently using `llama3-8b-8192`)
- Other available models: `mixtral-8x7b-32768`, `gemma-7b-it`
- Adjust `max_tokens` and `temperature` parameters for different response styles

### Quiz Format
- Modify the system prompt in the quiz endpoint to change question format
- Adjust the number of questions by changing the prompt

## Next.js Features

- **App Router**: Uses Next.js 14 App Router for modern routing
- **TypeScript**: Full TypeScript support for better development experience
- **API Routes**: Built-in API route handling with automatic proxy to backend
- **Optimization**: Automatic code splitting and optimization
- **Development**: Hot reload and fast refresh for better development experience

## Troubleshooting

### Common Issues

1. **Backend won't start**: Check if port 5000 is available or change PORT in .env
2. **API errors**: Verify your Groq API key is correct and has sufficient credits
3. **CORS errors**: Ensure the backend is running on the correct port
4. **Frontend build errors**: Make sure all dependencies are installed

### Error Messages

- **"Failed to get explanation"**: Check Groq API key and internet connection
- **"Failed to generate quiz"**: Verify API key and try with a different topic
- **"Topic is required"**: Make sure you're entering a topic before submitting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for educational purposes or hackathons!

## Support

For issues or questions, please check the troubleshooting section above or create an issue in the repository. 