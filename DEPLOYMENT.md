# MentorMe Deployment Guide

This guide provides multiple deployment options for your MentorMe application.

## Option 1: Simple Static Deployment (Recommended for Demo)

### Deploy to GitHub Pages, Netlify, or Vercel

1. **Use the standalone HTML file:**
   - The `index.html` file contains everything needed for a demo
   - It works offline with mock AI responses
   - Perfect for hackathons and quick demos

2. **Deploy to GitHub Pages:**
   ```bash
   # Create a new repository
   git init
   git add index.html README.md
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/mentorme.git
   git push -u origin main
   
   # Enable GitHub Pages in repository settings
   # Your app will be available at: https://yourusername.github.io/mentorme
   ```

3. **Deploy to Netlify:**
   - Drag and drop the `index.html` file to [Netlify](https://netlify.com)
   - Get a live URL instantly

4. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

## Option 2: Full-Stack Deployment with Backend

### Deploy to Railway, Render, or Heroku

1. **Prepare for deployment:**
   ```bash
   # Install dependencies
   npm run install-all
   
   # Set up environment variables
   cp backend/env.example backend/.env
   # Edit backend/.env with your Groq API key
   ```

2. **Deploy to Railway:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway init
   railway up
   ```

3. **Deploy to Render:**
   - Connect your GitHub repository
   - Set build command: `npm run install-all`
   - Set start command: `npm start`
   - Add environment variables in Render dashboard

4. **Deploy to Heroku:**
   ```bash
   # Install Heroku CLI
   # Create Procfile in root:
   echo "web: npm start" > Procfile
   
   # Deploy
   heroku create mentorme-app
   heroku config:set GROQ_API_KEY=your_api_key
   git push heroku main
   ```

## Option 3: Docker Deployment

### Create a Docker container

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   COPY backend/package*.json ./backend/
   COPY frontend/package*.json ./frontend/
   
   RUN npm run install-all
   
   COPY . .
   
   EXPOSE 5000
   
   CMD ["npm", "start"]
   ```

2. **Build and run:**
   ```bash
   docker build -t mentorme .
   docker run -p 5000:5000 -e GROQ_API_KEY=your_key mentorme
   ```

## Option 4: Local Development

### Run everything locally

1. **Quick start:**
   ```bash
   # Install all dependencies
   npm run install-all
   
   # Start both servers
   npm run dev
   ```

2. **Or use the batch file (Windows):**
   ```bash
   start.bat
   ```

3. **Or start manually:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

## Environment Variables

### Required for full deployment:
```bash
GROQ_API_KEY=gsk_your_groq_api_key_here
PORT=5000
NODE_ENV=production
```

### Optional:
```bash
FRONTEND_URL=https://your-frontend-domain.com
CORS_ORIGIN=https://your-frontend-domain.com
```

## Testing Your Deployment

1. **Health check:**
   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. **Test chat:**
   ```bash
   curl -X POST https://your-backend-url.com/api/chat \
     -H "Content-Type: application/json" \
     -d '{"topic": "javascript"}'
   ```

3. **Test quiz:**
   ```bash
   curl -X POST https://your-backend-url.com/api/quiz \
     -H "Content-Type: application/json" \
     -d '{"topic": "python"}'
   ```

## Troubleshooting

### Common Issues:

1. **CORS errors:**
   - Update `backend/server.js` with your frontend URL
   - Add `CORS_ORIGIN` environment variable

2. **API key not found:**
   - Verify `GROQ_API_KEY` is set in environment
   - Check the key starts with `gsk_`

3. **Port already in use:**
   - Change `PORT` environment variable
   - Update frontend proxy configuration

4. **Build failures:**
   - Ensure Node.js version 16+ is installed
   - Clear npm cache: `npm cache clean --force`

## Performance Optimization

1. **Enable compression:**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add caching headers:**
   ```javascript
   app.use(express.static('public', {
     maxAge: '1d'
   }));
   ```

3. **Rate limiting:**
   ```javascript
   const rateLimit = require('express-rate-limit');
   app.use(rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   }));
   ```

## Security Considerations

1. **Environment variables:** Never commit API keys
2. **HTTPS:** Always use HTTPS in production
3. **Input validation:** Validate all user inputs
4. **Rate limiting:** Prevent abuse
5. **CORS:** Configure properly for your domain

## Monitoring

1. **Add logging:**
   ```javascript
   const morgan = require('morgan');
   app.use(morgan('combined'));
   ```

2. **Error tracking:**
   - Consider Sentry or similar service
   - Log errors properly

3. **Health checks:**
   - Monitor `/api/health` endpoint
   - Set up uptime monitoring

Your MentorMe application is now ready for deployment! Choose the option that best fits your needs. 