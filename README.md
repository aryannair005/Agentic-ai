# Agentic AI

A hands-on repository for learning and experimenting with **LLMs, AI agents, tool calling, and agent workflows** using JavaScript.

The repository compares three approaches: calling an LLM directly, creating an agent with LangChain, and building an explicit workflow with LangGraph.

## Projects

| Folder | What it demonstrates |
|---|---|
| `Normal_LLM/` | A basic Gemini chat API using direct model invocation. |
| `LLM_with_AGENTS/` | A LangChain agent created with `createAgent` and a custom tool. |
| `LangGraph/` | An explicit agent workflow built with `StateGraph`, an agent node, a `ToolNode`, and conditional routing. |

Each folder is an independent Node.js application with its own `package.json`.

## LangGraph Workflow

The LangGraph implementation uses **Google Gemini 2.5 Flash** with tools and a graph that decides whether to execute a tool or finish the response.

![LangGraph workflow](assets/langgraph-workflow.png)

### How the workflow works

1. **START → Agent:** The graph begins at the agent node. The agent sends the conversation messages to Gemini.
2. **Agent decides the next step:** Gemini either responds normally or returns one or more tool calls.
3. **Conditional routing:**
   - When the latest AI message contains tool calls, the graph routes execution to the **Tool Node**.
   - When there are no tool calls, the graph routes to **END**.
4. **Tool Node → Agent:** The `ToolNode` executes the requested tool and adds its result to the message state. Control then returns to the agent.
5. **Repeat or finish:** The agent can request another tool or return a final answer. The graph ends when no more tool calls are requested.

The graph is built using `StateGraph` and `MessagesAnnotation`. In code, the main edges are:

- `START → agent`
- `agent → tool_node` or `END` (conditional)
- `tool_node → agent`

### Tools in the LangGraph example

| Tool | Purpose |
|---|---|
| Tavily Search | Searches the web and returns search results. |
| `addition_tool` | Demonstrates defining a custom tool with a Zod input schema. Its current implementation returns a placeholder string rather than calculating the sum. |
| `Email_sending_tool` | Demonstrates a custom email-related tool. It returns a simulated confirmation; it does not send a real email. |

The chat endpoint invokes the compiled graph with the user's prompt and returns the content of the final assistant message.

## Tech Stack

- **Runtime:** Node.js (ES modules)
- **API:** Express 5
- **LLM:** Google Gemini 2.5 Flash
- **Agent framework:** LangChain
- **Workflow orchestration:** LangGraph
- **Tools:** Tavily Search and custom tools
- **Input validation:** Zod
- **Configuration:** dotenv
- **Development:** Nodemon

## Repository Structure

```text
Agentic-ai/
├── Normal_LLM/
│   ├── package.json
│   └── server.js
├── LLM_with_AGENTS/
│   ├── package.json
│   └── server.js
├── LangGraph/
│   ├── package.json
│   └── server.js
├── assets/
│   └── langgraph-workflow.png
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- A Google AI API key with access to Gemini
- A Tavily API key to run the web-search tool in the LangGraph example

### Run the LangGraph project

Clone the repository and enter the LangGraph folder:

```bash
git clone https://github.com/aryannair005/Agentic-ai.git
cd Agentic-ai/LangGraph
npm install
```

Create a `.env` file inside the `LangGraph` folder:

```env
GOOGLE_API_KEY=your_google_api_key
TAVILY_API_KEY=your_tavily_api_key
PORT=8000
```

Start the development server:

```bash
npm run dev
```

The server listens on port `8000` by default, or on the port provided through `PORT`.

### Run another example

Each project has its own dependencies. To run the direct LLM or LangChain agent example, enter its folder and install its dependencies:

```bash
cd ../Normal_LLM
# or: cd ../LLM_with_AGENTS
npm install
```

Create a `.env` file in that folder with the Google API key:

```env
GOOGLE_API_KEY=your_google_api_key
PORT=8000
```

Then run:

```bash
npm run dev
```

Keep API keys private. Do not commit your `.env` files to Git.

## API Reference

The applications expose a chat endpoint:

**Endpoint:** `POST /chat`

**Request body:**

```json
{
  "prompt": "Explain how an agent decides when to call a tool."
}
```

**Example using cURL:**

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Explain how an agent decides when to call a tool."}'
```

## Learning Roadmap

This repository will grow as more agentic AI concepts are explored.

- [x] Direct LLM invocation with Gemini
- [x] LangChain agent with a custom tool
- [x] LangGraph workflow with conditional tool execution
- [ ] Add conversation memory and persistent state
- [ ] Add more tools and multi-step workflows
- [ ] Explore human-in-the-loop execution

## Contributing

This is a learning project. Suggestions, issues, and improvements are welcome.

## Author

**Aryan Nair**

- GitHub: [@aryannair005](https://github.com/aryannair005)
