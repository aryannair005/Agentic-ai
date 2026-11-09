# Agentic AI

A hands-on repository for learning and building **Agentic AI applications**. The project is organized into levels, with each level focusing on a small implementation that builds practical experience with AI application development.

## Current Progress

### Level 1 — AI Chat Assistant

The first implementation is a simple AI-powered chat API built with **Node.js**, **Express 5**, and **LangChain's Google integration**.

It connects to Google's Gemini model (`gemini-2.5-flash`) and exposes a `POST /chat` endpoint. The assistant is configured with the persona **Sanjana**.

## Tech Stack

- **Runtime:** Node.js (ES modules)
- **API:** Express 5
- **LLM integration:** LangChain — `@langchain/google` and `@langchain/core`
- **Model:** Google Gemini 2.5 Flash
- **Configuration:** dotenv
- **Development:** Nodemon

## Repository Structure

```text
Agentic-ai/
└── Level-1/
    ├── package.json
    └── server.js
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- A Google API key with access to the Gemini API

### 1. Clone the repository

```bash
git clone https://github.com/aryannair005/Agentic-ai.git
cd Agentic-ai/Level-1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `Level-1` directory:

```env
GOOGLE_API_KEY=your_google_api_key
PORT=8000
```

Keep your API key private. Do not commit the `.env` file to Git.

### 4. Start the development server

```bash
npm run dev
```

The server runs on port `8000` by default, or the port specified by the `PORT` environment variable.

## API Reference

### Chat with the assistant

**Endpoint:** `POST /chat`

**Request body:**

```json
{
  "prompt": "Explain what an AI agent is."
}
```

**Example using cURL:**

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Explain what an AI agent is."}'
```

The endpoint returns the model's response as JSON. If the `prompt` is missing, it responds with:

```json
{
  "message": "Invalid Prompt."
}
```

## Learning Roadmap

This repository is intended to grow incrementally as new concepts and implementations are added.

- [x] Level 1: Basic Gemini-powered chat API
- [ ] Add conversation memory
- [ ] Explore tool calling
- [ ] Build an agent with multiple tools
- [ ] Add multi-step agent workflows

*The unchecked items are planned learning milestones, not features currently implemented.*

## Contributing

This is a learning project. Suggestions, issues, and improvements are welcome.

## Author

**Aryan Nair**

- GitHub: [@aryannair005](https://github.com/aryannair005)
