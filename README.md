# 🤖 DSA RAG Chatbot

An intelligent question-answering system built with Retrieval-Augmented Generation (RAG) that allows you to chat with your Data Structures & Algorithms PDF documents using AI.

## ✨ Features

- 📄 **PDF Processing**: Automatically extracts and chunks text from PDF documents
- 🔍 **Vector Search**: Uses Pinecone vector database for semantic similarity search
- 🧠 **AI-Powered Answers**: Leverages Google's Gemini AI for intelligent responses
- 💬 **Conversational Interface**: Maintains chat history for context-aware conversations
- 🎯 **Accurate Responses**: Answers are grounded in your uploaded documents

## 🛠️ Tech Stack

- **LangChain** - Orchestration framework for LLM applications
- **Pinecone** - Vector database for embeddings storage
- **Google Gemini AI** - Large language model for text generation
- **Google GenAI Embeddings** - Vector embeddings (768 dimensions)
- **Node.js** - Runtime environment

## 📋 Prerequisites

- Node.js v18 or higher
- Pinecone account (free tier available)
- Google AI Studio API key (free tier available)

## 🚀 Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/dsa-rag-chatbot.git
   cd dsa-rag-chatbot
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PINECONE_API_KEY=your_pinecone_api_key_here
   PINECONE_INDEX_NAME=your_index_name
```

4. **Create Pinecone Index**
   - Go to [Pinecone Console](https://app.pinecone.io)
   - Create a new index with:
     - **Name**: `xyz` 
     - **Dimensions**: `768`
     - **Metric**: `cosine`

## 📖 Usage

### 1. Index your PDF document

Place your PDF file in the project directory and run:
```bash
node index.js
```

This will:
- Load the PDF
- Split it into chunks
- Generate embeddings
- Store vectors in Pinecone

### 2. Start chatting
```bash
node query.js
```

Ask questions about your document:
```
Ask me anything--> What is binary search?
Ask me anything--> Explain time complexity of merge sort
Ask me anything--> What are the types of trees?
```

## 🏗️ Project Structure
```
dsa-rag-chatbot/
├── index.js           # PDF indexing script
├── query.js           # Query/chat interface
├── .env               # Environment variables (not committed)
├── .gitignore         # Git ignore file
├── package.json       # Node.js dependencies
└── README.md          # This file
```

## 🔧 How It Works

1. **Document Processing**
   - PDF is loaded using LangChain's PDFLoader
   - Text is split into chunks (1000 chars, 200 overlap)

2. **Embedding Generation**
   - Each chunk is converted to a 768-dimensional vector
   - Uses Google's `text-embedding-004` model

3. **Vector Storage**
   - Embeddings are stored in Pinecone vector database
   - Metadata includes original text for retrieval

4. **Query Processing**
   - User question is converted to a vector
   - Top 10 similar chunks are retrieved from Pinecone
   - Context is passed to Gemini AI
   - AI generates answer based only on retrieved context

## 🐛 Troubleshooting

### API Quota Exceeded
If you see `429` errors:
- Switch to `gemini-1.5-flash` model (higher limits)
- Wait for quota to reset (daily)
- Create a new API key in a different project

### Dimension Mismatch
Ensure your Pinecone index has **768 dimensions** to match the embedding model.

### Module Not Found
Run `npm install` to install all dependencies.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

**Your Name**
- Competitive Programmer
- MERN Stack Developer
- DSA Enthusiast

## 🙏 Acknowledgments

- LangChain community
- Pinecone documentation
- Google AI Studio

---
