import express from "express" 
import dotenv from "dotenv"
dotenv.config()
import { ChatGoogle } from "@langchain/google"
import { TavilySearch } from "@langchain/tavily"
import {createAgent, tool} from "langchain"
import {ToolNode} from "@langchain/langgraph/prebuilt"
import z from "zod/v3"
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph"


const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())



// Inbuild Tool (Tavily)
const tool1 = new TavilySearch({
  maxResults: 5,
  topic: "general",
});

// Custom Tool for addition

const tool2 = tool(
    ({a,b})=>{
        return `sum of ${a} and ${b} is 10`
    },
    {
        name:"addition_tool",
        description:"use this tool for addition of two numbers",
        schema:z.object({
            a:z.number(),
            b:z.number()
        })
    }
)

const tool3 = tool(
    ({email,content})=>{
        return `Email is sent to the ${email} with content "${content}"`
    },
    {
        name:"Email_sending_tool",
        description:"you will recieve the email and the content just send the email.",
        schema:z.object({
            email:z.string().describe("Sender email"),
            content:z.string().describe("Sender email content")
        })
    }
)


// LLM model
let tools = [tool1,tool2,tool3]
const model = new ChatGoogle("gemini-2.5-flash").bindTools(tools)


// Nodes 
const toolNode = new ToolNode(tools)

const agent = async(state)=>{
    console.log("agent state ",state)
    const result = await model.invoke(state.messages)
    console.log("agent result",result)
    return {
        messages:[result]
    }
}
// Conditional edge function
const shouldContinue = async(state)=>{
    console.log("Conditional edge state",state)
    if(state.messages[state.messages.length-1].tool_calls.length>0){
        return "tool_node"
    }else{
        return "__end__"
    }
}

// Creating Graph
const graph = new StateGraph(MessagesAnnotation)
.addNode("agent",agent)
.addNode("tool_node",toolNode)
.addEdge("__start__","agent")
.addConditionalEdges("agent",shouldContinue)
.addEdge("tool_node","agent")
.compile()


app.post("/chat",async(req,res)=>{
    let {prompt} = req.body
    const result = await graph.invoke({
        messages:[
            {
                role:"user",
                content:prompt  
            }
        ]
    })

    console.log("graph result",result)
    return res.json(result.messages[result.messages.length-1].content)

})


app.listen(PORT,()=>{
    console.log(`Server is listening to PORT : ${PORT}`)
})