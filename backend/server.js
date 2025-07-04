const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Groq = require('groq-sdk');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const net = require('net');

// Load environment variables
dotenv.config();

const app = express();
const DEFAULT_PORT = process.env.PORT || 5000;

// Check if GROQ_API_KEY is available
if (!process.env.GROQ_API_KEY) {
  console.error('❌ GROQ_API_KEY environment variable is missing!');
  console.error('Please set your Groq API key in the .env file');
  process.exit(1);
}

// Initialize Groq with error handling
let groq;
try {
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  console.log('✅ Groq client initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Groq client:', error.message);
  process.exit(1);
}

// Function to find an available port
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Try the next port
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
};

// In-memory storage for chat history (in production, use a database)
const chatHistory = new Map();

// Helper function to get user history
const getUserHistory = (userId) => {
  if (!chatHistory.has(userId)) {
    chatHistory.set(userId, {
      chats: [],
      documents: [],
      notes: []
    });
  }
  return chatHistory.get(userId);
};

// Helper function to save chat
const saveChat = (userId, chatData) => {
  const userHistory = getUserHistory(userId);
  const chatEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...chatData
  };
  userHistory.chats.push(chatEntry);
  return chatEntry;
};

// Helper function to save document
const saveDocument = (userId, documentData) => {
  const userHistory = getUserHistory(userId);
  const documentEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...documentData
  };
  userHistory.documents.push(documentEntry);
  return documentEntry;
};

// Helper function to save notes
const saveNotes = (userId, notesData) => {
  const userHistory = getUserHistory(userId);
  const notesEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...notesData
  };
  userHistory.notes.push(notesEntry);
  return notesEntry;
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept common document formats
    const allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/markdown',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'audio/mpeg',
      'audio/wav',
      'audio/mp4',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a fun, friendly, and interactive AI tutor named MentorMe! 🎓✨

Your responses should be:
- SHORT and CONCISE (max 100-150 words)
- FUN and ENGAGING with emojis and personality
- INTERACTIVE - ask follow-up questions to keep the conversation going
- EASY to understand - use simple language
- ENCOURAGING and supportive

Examples of good responses:
'Great question! 🌟 [Brief explanation in 2-3 sentences] 

Want to dive deeper? Ask me about [related topic] or try our quiz feature! 🧠'

'That's a cool topic! 🚀 [Quick explanation] 

Pro tip: [One helpful tip] 💡

Ready to test your knowledge? Let's make a quiz! 🎯'

Keep it light, fun, and make the user want to learn more! 🎉`
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 300
    })

    const response = completion.choices[0].message.content

    // Save chat history (using email as userId for demo)
    const userId = req.body.userId || 'demo-user'
    saveChat(userId, {
      type: 'chat',
      topic: message,
      response: response,
      hasAttachment: false
    })

    res.json({ response })
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to get response',
      details: error.message 
    });
  }
});

// Quiz generator endpoint
app.post('/api/quiz', async (req, res) => {
  try {
    const { topic } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a fun quiz generator! 🎯 Create at least 5 multiple choice questions with 4 options each that are:

- ENGAGING and INTERESTING
- EASY to understand
- FUN to answer
- EDUCATIONAL but not boring

Return ONLY valid JSON in this format: {"questions": [{"question": "question text", "options": ["A", "B", "C", "D"], "correctAnswer": 0}]}
Do not include any text or explanation before or after the JSON. Do not use markdown. Only output the JSON object.`
        },
        {
          role: "user",
          content: `Generate at least 5 multiple choice questions about: ${topic}`
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.8,
      max_tokens: 1000,
    });

    const quizData = completion.choices[0].message.content;
    console.log('Raw AI quiz response:', quizData);
    // Try to parse the JSON response
    let questions;
    try {
      // Clean the response to extract JSON
      const jsonMatch = quizData.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // If parsing fails, create a fallback response
      questions = {
        questions: [
          {
            question: 'What is the main concept of Java?',
            options: ['Object-Oriented Programming', 'Procedural Programming', 'Functional Programming', 'Logic Programming'],
            correctAnswer: 0
          },
          {
            question: 'Which company originally developed Java?',
            options: ['Microsoft', 'Sun Microsystems', 'Apple', 'Google'],
            correctAnswer: 1
          },
          {
            question: 'Which keyword is used to inherit a class in Java?',
            options: ['this', 'super', 'extends', 'implements'],
            correctAnswer: 2
          },
          {
            question: 'Which method is the entry point of a Java program?',
            options: ['start()', 'main()', 'run()', 'init()'],
            correctAnswer: 1
          },
          {
            question: 'Which of these is NOT a Java primitive type?',
            options: ['int', 'float', 'String', 'boolean'],
            correctAnswer: 2
          }
        ]
      };
    }
    // After parsing the AI response and before sending the response
    if (questions && questions.questions && Array.isArray(questions.questions)) {
      let fallbackQuestions = [
        {
          question: 'What is the main concept of Java?',
          options: ['Object-Oriented Programming', 'Procedural Programming', 'Functional Programming', 'Logic Programming'],
          correctAnswer: 0
        },
        {
          question: 'Which company originally developed Java?',
          options: ['Microsoft', 'Sun Microsystems', 'Apple', 'Google'],
          correctAnswer: 1
        },
        {
          question: 'Which keyword is used to inherit a class in Java?',
          options: ['this', 'super', 'extends', 'implements'],
          correctAnswer: 2
        },
        {
          question: 'Which method is the entry point of a Java program?',
          options: ['start()', 'main()', 'run()', 'init()'],
          correctAnswer: 1
        },
        {
          question: 'Which of these is NOT a Java primitive type?',
          options: ['int', 'float', 'String', 'boolean'],
          correctAnswer: 2
        }
      ];
      while (questions.questions.length < 5) {
        questions.questions.push(fallbackQuestions[questions.questions.length % fallbackQuestions.length]);
      }
      questions.questions = questions.questions.slice(0, 5);
    }
    
    res.json({ 
      success: true, 
      questions: questions.questions,
      topic 
    });
  } catch (error) {
    console.error('Quiz error:', error);
    res.status(500).json({ 
      error: 'Failed to generate quiz',
      details: error.message 
    });
  }
});

// Document upload and processing endpoint
app.post('/api/upload-document', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = file.originalname;
    const fileType = file.mimetype;
    const filePath = file.path;

    console.log(`Processing file: ${fileName} (${fileType})`);

    // For now, we'll handle text files directly
    // In a production environment, you'd want to use libraries like:
    // - pdf-parse for PDFs
    // - mammoth for Word documents
    // - speech recognition APIs for audio files
    // - OCR for images
    
    let fileContent = '';
    
    if (fileType.startsWith('text/')) {
      // Handle text files
      fileContent = fs.readFileSync(filePath, 'utf8');
    } else {
      // For other file types, we'll create a placeholder
      // In a real implementation, you'd extract text from these files
      fileContent = `Document: ${fileName}\nType: ${fileType}\n\nThis is a ${fileType} document. Please extract the main content and key points from this file.`;
    }

    // Generate simplified notes using AI
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a fun and friendly study buddy! 📚✨ Your task is to create super easy-to-understand notes from uploaded documents.

Make the notes:
- SHORT and SWEET (max 300 words total)
- FUN and ENGAGING with emojis
- EASY to read with clear sections
- FOCUSED on the most important stuff
- PERFECT for quick study sessions

Structure:
🎯 **Key Points** - Main ideas (2-3 bullet points)
📖 **Important Terms** - Key definitions (2-3 terms)
💡 **Quick Tips** - How to remember this stuff
🎉 **Summary** - One sentence overview

Keep it light, fun, and make learning feel like a breeze! 🌟`
        },
        {
          role: "user",
          content: `Please analyze this document and create simplified study notes:\n\n${fileContent}`
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.8,
      max_tokens: 500,
    });

    const notes = completion.choices[0].message.content;

    // Save document and notes history (using email as userId for demo)
    const userId = req.body.userId || 'demo-user'
    saveDocument(userId, {
      fileName,
      fileType,
      originalContent: fileContent.substring(0, 500) + '...' // Save first 500 chars
    })
    
    saveNotes(userId, {
      documentName: fileName,
      notes: notes,
      topic: 'Document Analysis'
    })

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    res.json({ 
      success: true, 
      fileName,
      fileType,
      notes,
      message: 'Document processed successfully'
    });

  } catch (error) {
    console.error('Document processing error:', error);
    
    // Clean up file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('File cleanup error:', cleanupError);
      }
    }
    
    res.status(500).json({ 
      error: 'Failed to process document',
      details: error.message 
    });
  }
});

// AI Tutor Chat with Attachments
app.post('/api/chat-with-attachment', upload.single('attachment'), async (req, res) => {
  try {
    const { message } = req.body
    const attachment = req.file

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    let context = ''
    
    // If there's an attachment, process it first
    if (attachment) {
      console.log(`Processing attachment: ${attachment.originalname} (${attachment.mimetype})`)
      
      try {
        let fileContent = ''
        
        // Handle different file types
        if (attachment.mimetype.startsWith('text/') || attachment.mimetype === 'application/json') {
          fileContent = fs.readFileSync(attachment.path, 'utf8')
        } else if (attachment.mimetype === 'application/pdf') {
          // For PDFs, we'll extract text (simplified - in production you'd use a PDF parser)
          fileContent = `[PDF Document: ${attachment.originalname}] - Content would be extracted here in production`
        } else if (attachment.mimetype.includes('word') || attachment.mimetype.includes('document')) {
          fileContent = `[Word Document: ${attachment.originalname}] - Content would be extracted here in production`
        } else if (attachment.mimetype.includes('image')) {
          fileContent = `[Image: ${attachment.originalname}] - Image content would be analyzed here in production`
        } else if (attachment.mimetype.includes('audio') || attachment.mimetype.includes('video')) {
          fileContent = `[Media: ${attachment.originalname}] - Audio/Video content would be transcribed here in production`
        } else {
          fileContent = `[File: ${attachment.originalname}] - File content would be processed here in production`
        }
        
        context = `\n\nDocument Context:\n${fileContent}\n\nUser Question: ${message}`
        
        // Clean up uploaded file
        fs.unlinkSync(attachment.path)
      } catch (error) {
        console.error('Error processing attachment:', error)
        // Clean up file if it exists
        if (fs.existsSync(attachment.path)) {
          fs.unlinkSync(attachment.path)
        }
        return res.status(500).json({ error: 'Failed to process attachment' })
      }
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a fun, friendly, and interactive AI tutor named MentorMe! 🎓✨

Your responses should be:
- SHORT and CONCISE (max 100-150 words)
- FUN and ENGAGING with emojis and personality
- INTERACTIVE - ask follow-up questions to keep the conversation going
- EASY to understand - use simple language
- ENCOURAGING and supportive

If the user uploads a document, analyze it and answer their question about it. Be helpful and specific about the document content.

Examples of good responses:
'Great question! 🌟 [Brief explanation in 2-3 sentences] 

Want to dive deeper? Ask me about [related topic] or try our quiz feature! 🧠'

'That's a cool topic! 🚀 [Quick explanation] 

Pro tip: [One helpful tip] 💡

Ready to test your knowledge? Let's make a quiz! 🎯'

Keep it light, fun, and make the user want to learn more! 🎉`
        },
        {
          role: "user",
          content: attachment ? `I've uploaded a document and have a question about it: ${message}${context}` : message
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 300
    })

    res.json({ 
      response: completion.choices[0].message.content,
      hasAttachment: !!attachment
    })

    // Save chat history with attachment (using email as userId for demo)
    const userId = req.body.userId || 'demo-user'
    saveChat(userId, {
      type: 'chat_with_attachment',
      message: message,
      response: completion.choices[0].message.content,
      hasAttachment: !!attachment,
      attachmentName: attachment?.originalname,
      attachmentType: attachment?.mimetype
    })
  } catch (error) {
    console.error('Chat with attachment error:', error)
    res.status(500).json({ error: 'Failed to process chat with attachment' })
  }
})

// Get user history
app.get('/api/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const userHistory = getUserHistory(userId);
    res.json(userHistory);
  } catch (error) {
    console.error('Error getting history:', error);
    res.status(500).json({ error: 'Failed to get history' });
  }
});

// Clear user history
app.delete('/api/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    chatHistory.delete(userId);
    res.json({ message: 'History cleared successfully' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MentorMe backend is running',
    provider: 'Groq',
    model: 'llama3-8b-8192',
    timestamp: new Date().toISOString()
  });
});

// Start server with automatic port finding
const startServer = async () => {
  try {
    const port = await findAvailablePort(DEFAULT_PORT);
    const server = app.listen(port, () => {
      console.log(`🚀 MentorMe backend server running on port ${port}`);
      console.log(`🔍 Health check: http://localhost:${port}/api/health`);
      console.log(`🤖 AI Provider: Groq (llama3-8b-8192)`);
      console.log(`📝 API Endpoints:`);
      console.log(`   - POST /api/chat - Chat with AI tutor`);
      console.log(`   - POST /api/quiz - Generate quiz`);
      console.log(`   - POST /api/upload - Upload documents`);
      console.log(`   - POST /api/chat-with-attachment - Chat with file attachments`);
      console.log(`   - GET /api/health - Health check`);
    });

    // Handle server errors
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`⚠️  Port ${port} is busy, trying next available port...`);
        startServer();
      } else {
        console.error('❌ Server error:', err);
      }
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 Received SIGTERM, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('🛑 Received SIGINT, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();