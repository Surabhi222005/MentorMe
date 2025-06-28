# MentorMe - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Demo Version (No Setup Required)

1. **Open the HTML file directly:**
   - Double-click `index.html` in your file explorer
   - It opens in your browser and works immediately
   - Features mock AI responses for demo purposes

2. **Test the features:**
   - Try asking about "javascript", "python", "react", "machine learning"
   - Generate quizzes on the same topics
   - Everything works offline!

### Option 2: Full Version with Real AI

1. **Get a Groq API key:**
   - Go to [Groq Console](https://console.groq.com/)
   - Sign up and create an API key (free tier available)

2. **Set up the backend:**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env and add your Groq API key
   npm install
   npm run dev
   ```

3. **Set up the frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open your browser:**
   - Go to http://localhost:3000
   - Start chatting with real AI!

## 🎯 What You Can Do

### AI Tutor Chat
- Ask about any topic: "Explain quantum physics"
- Get detailed explanations
- Continue conversations

### Quiz Generator
- Generate quizzes on any subject
- Get 3 multiple-choice questions
- Check your answers and see your score

## 📁 File Structure

```
MentorMe/
├── index.html              # Standalone demo version
├── backend/                # Node.js server with Groq API
├── frontend/               # Next.js frontend
├── start.bat               # Windows quick start script
├── DEPLOYMENT.md           # Deployment options
└── README.md               # Full documentation
```

## 🔧 Troubleshooting

### Demo Version Issues
- **File won't open:** Make sure you have a modern browser
- **Features not working:** Try refreshing the page

### Full Version Issues
- **Backend won't start:** Check if port 5000 is free
- **API errors:** Verify your Groq API key
- **Frontend won't start:** Check if port 3000 is free

## 🚀 Deployment Options

### Quick Demo Deployment
1. Upload `index.html` to any web hosting service
2. Get a live URL instantly
3. Share with others

### Full Deployment
- **Railway:** `railway up`
- **Render:** Connect GitHub repo
- **Heroku:** `git push heroku main`
- **Vercel:** `vercel`

## 💡 Tips

1. **For Hackathons:** Use the demo version - it works immediately
2. **For Production:** Use the full version with real AI
3. **For Learning:** Start with demo, then add real AI
4. **For Sharing:** Deploy to GitHub Pages or Netlify

## 🆘 Need Help?

- **Demo not working:** Check browser console for errors
- **API issues:** Verify your Groq API key
- **Deployment problems:** Check the DEPLOYMENT.md file
- **Still stuck:** Create an issue in the repository

## 🎉 You're Ready!

Your MentorMe application is now ready to use. Choose the option that fits your needs and start learning with AI! 