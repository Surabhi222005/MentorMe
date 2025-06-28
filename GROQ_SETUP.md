# Groq API Setup Guide

This guide will help you set up Groq API for the MentorMe application.

## What is Groq?

Groq is an AI inference platform that provides ultra-fast responses using state-of-the-art language models. It's known for:
- **Speed**: Sub-second response times
- **Cost-effectiveness**: More affordable than many alternatives
- **Quality**: Powered by Meta's Llama3 and other high-quality models
- **Reliability**: Enterprise-grade infrastructure

## Step 1: Create a Groq Account

1. Visit [Groq Console](https://console.groq.com/)
2. Click "Sign Up" or "Get Started"
3. Complete the registration process
4. Verify your email address

## Step 2: Get Your API Key

1. Log in to your Groq Console
2. Navigate to the "API Keys" section
3. Click "Create API Key"
4. Give your key a descriptive name (e.g., "MentorMe Development")
5. Copy the generated API key (it starts with `gsk_`)

## Step 3: Configure Your Environment

1. In your MentorMe project, navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the environment template:
   ```bash
   cp env.example .env
   ```

3. Edit the `.env` file and add your Groq API key:
   ```
   GROQ_API_KEY=gsk_your_actual_api_key_here
   PORT=5000
   ```

## Step 4: Test Your Setup

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. Test the health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```

   You should see a response like:
   ```json
   {
     "status": "OK",
     "message": "MentorMe backend is running",
     "provider": "Groq",
     "model": "llama3-8b-8192"
   }
   ```

## Available Models

Groq offers several models you can use:

### Llama3-8b-8192 (Default)
- **Model ID**: `llama3-8b-8192`
- **Best for**: General conversation, explanations, creative writing
- **Speed**: Very fast
- **Cost**: Low

### Mixtral-8x7b-32768
- **Model ID**: `mixtral-8x7b-32768`
- **Best for**: Complex reasoning, coding, detailed analysis
- **Speed**: Fast
- **Cost**: Medium

### Gemma-7b-it
- **Model ID**: `gemma-7b-it`
- **Best for**: Instruction following, structured tasks
- **Speed**: Very fast
- **Cost**: Low

## Changing Models

To use a different model, edit `backend/server.js` and change the model parameter:

```javascript
// For Mixtral
model: "mixtral-8x7b-32768"

// For Gemma
model: "gemma-7b-it"

// For Llama3 (current)
model: "llama3-8b-8192"
```

## Pricing

Groq offers competitive pricing:
- **Llama3-8b-8192**: $0.05 per 1M tokens
- **Mixtral-8x7b-32768**: $0.24 per 1M tokens
- **Gemma-7b-it**: $0.10 per 1M tokens

## Usage Limits

- **Free Tier**: Generous limits for development
- **Paid Plans**: Higher limits and priority access
- **No Rate Limits**: Unlike some providers, Groq doesn't have strict rate limiting

## Troubleshooting

### Common Issues

1. **"Invalid API Key"**
   - Verify your API key is correct
   - Make sure there are no extra spaces or characters
   - Check that the key starts with `gsk_`

2. **"Rate Limit Exceeded"**
   - Groq rarely hits rate limits
   - Check your usage in the console
   - Consider upgrading to a paid plan if needed

3. **"Model Not Found"**
   - Verify the model name is correct
   - Check that the model is available in your region
   - Try a different model if needed

### Getting Help

- **Documentation**: [Groq Docs](https://console.groq.com/docs)
- **Community**: [Groq Discord](https://discord.gg/groq)
- **Support**: Available through the console

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** regularly
4. **Monitor usage** in the Groq console
5. **Set up alerts** for unusual usage patterns

## Next Steps

Once you have your Groq API key configured:

1. Start the backend: `cd backend && npm run dev`
2. Start the frontend: `cd frontend && npm run dev`
3. Open http://localhost:3000 in your browser
4. Test the AI Tutor Chat and Quiz Generator features

Enjoy your fast, cost-effective AI-powered learning buddy! 🚀 