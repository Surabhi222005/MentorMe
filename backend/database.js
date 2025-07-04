const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Chat History Schema
const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  hasAttachment: {
    type: Boolean,
    default: false
  },
  attachmentName: String,
  attachmentType: String
}, {
  timestamps: true
});

// Quiz History Schema
const quizHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    userAnswer: Number
  }]
}, {
  timestamps: true
});

// Document Upload Schema
const documentUploadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  originalContent: {
    type: String,
    default: ''
  },
  aiNotes: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create models
const User = mongoose.model('User', userSchema);
const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
const QuizHistory = mongoose.model('QuizHistory', quizHistorySchema);
const DocumentUpload = mongoose.model('DocumentUpload', documentUploadSchema);

// User management functions
const userFunctions = {
  // Create a new user
  createUser: async (name, email, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = new User({
        name,
        email,
        password: hashedPassword
      });
      
      const savedUser = await user.save();
      return {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        createdAt: savedUser.createdAt
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  },

  // Find user by email
  findUserByEmail: async (email) => {
    return await User.findOne({ email: email.toLowerCase() });
  },

  // Verify user password
  verifyPassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },

  // Get user by ID
  getUserById: async (userId) => {
    return await User.findById(userId).select('-password');
  }
};

// Chat history functions
const chatFunctions = {
  // Save chat message
  saveChat: async (userId, message, response, hasAttachment = false, attachmentName = null, attachmentType = null) => {
    const chat = new ChatHistory({
      userId,
      message,
      response,
      hasAttachment,
      attachmentName,
      attachmentType
    });
    
    return await chat.save();
  },

  // Get user's chat history
  getChatHistory: async (userId, limit = 50) => {
    return await ChatHistory.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .then(chats => chats.reverse()); // Return in chronological order
  }
};

// Quiz history functions
const quizFunctions = {
  // Save quiz result
  saveQuizResult: async (userId, topic, score, totalQuestions, questions = []) => {
    const quiz = new QuizHistory({
      userId,
      topic,
      score,
      totalQuestions,
      questions
    });
    
    return await quiz.save();
  },

  // Get user's quiz history
  getQuizHistory: async (userId, limit = 20) => {
    return await QuizHistory.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit);
  }
};

// Document upload functions
const documentFunctions = {
  // Save document upload
  saveDocument: async (userId, fileName, fileType, originalContent, aiNotes) => {
    const document = new DocumentUpload({
      userId,
      fileName,
      fileType,
      originalContent,
      aiNotes
    });
    
    return await document.save();
  },

  // Get user's document uploads
  getDocumentUploads: async (userId, limit = 20) => {
    return await DocumentUpload.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit);
  }
};

module.exports = {
  connectDB,
  User,
  ChatHistory,
  QuizHistory,
  DocumentUpload,
  userFunctions,
  chatFunctions,
  quizFunctions,
  documentFunctions
}; 