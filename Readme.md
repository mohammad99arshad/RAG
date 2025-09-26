# RAG (Retrieval-Augmented Generation) System

A powerful RAG (Retrieval-Augmented Generation) system that combines document retrieval with large language models to provide accurate and context-aware responses to user queries. This implementation uses Pinecone for vector storage and Google's Gemini for embeddings and text generation.

## 🌟 Features

- **Document Processing**: Automatically processes and chunks PDF documents
- **Vector Embeddings**: Uses Google's text-embedding-004 model for document embeddings
- **Vector Database**: Leverages Pinecone for efficient vector similarity search
- **Context-Aware Responses**: Utilizes Gemini 2.0 Flash for generating accurate responses
- **Query Rewriting**: Implements smart query transformation for better retrieval
- **Conversation History**: Maintains context across multiple interactions

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Pinecone account and API key
- Google Gemini API key

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Rag
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX_NAME=your_pinecone_index_name
   PINECONE_ENVIRONMENT=your_pinecone_environment
   ```

## 🏗️ Project Structure

```
.
├── index.js           # Main script for document indexing
├── query.js          # Query processing and response generation
├── package.json      # Project dependencies
├── .env              # Environment variables
└── DBMS.pdf          # Example document (replace with your own)
```

## 🧠 How It Works

1. **Document Indexing** (`index.js`):
   - Loads and splits PDF documents into chunks
   - Generates vector embeddings for each chunk
   - Stores the embeddings in Pinecone vector database

2. **Query Processing** (`query.js`):
   - Takes user queries and rewrites them for better context
   - Converts queries to vector embeddings
   - Retrieves relevant document chunks from Pinecone
   - Generates responses using Gemini 2.0 Flash

## 💻 Usage

1. **Index your documents**:
   Place your PDF file in the project root and update the `PDF_PATH` in `index.js` if needed, then run:
   ```bash
   node index.js
   ```

2. **Start querying**:
   ```bash
   node query.js
   ```
   Follow the interactive prompt to ask questions about your documents.

## 🔧 Dependencies

- `@google/generative-ai`: Google's Gemini AI SDK
- `@langchain/community`: LangChain community integrations
- `@langchain/core`: Core LangChain functionality
- `@langchain/google-genai`: Google Gemini integration for LangChain
- `@langchain/pinecone`: Pinecone vector store integration
- `@pinecone-database/pinecone`: Pinecone client
- `dotenv`: Environment variable management

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | ✅ Yes |
| `PINECONE_API_KEY` | Pinecone API key | ✅ Yes |
| `PINECONE_INDEX_NAME` | Name of your Pinecone index | ✅ Yes |
| `PINECONE_ENVIRONMENT` | Pinecone environment (e.g., 'gcp-starter') | ✅ Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 🙏 Acknowledgments

- Google for the Gemini AI models
- Pinecone for the vector database
- The LangChain team for their amazing framework

## 📧 Contact

For any questions or feedback, please open an issue or contact the project maintainers.
