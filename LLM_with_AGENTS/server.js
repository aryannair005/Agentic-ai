import express from "express" 
import dotenv from "dotenv"
dotenv.config()
import { ChatGoogle } from "@langchain/google"
import { TavilySearch } from "@langchain/tavily"
import {createAgent, tool} from "langchain"
import z from "zod/v3"


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
const model = new ChatGoogle("gemini-2.5-flash")


app.post("/chat",async(req,res)=>{
    let {prompt} = req.body
    const agent = createAgent({
        model,
        tools:[tool3]
    })

    const response = await agent.invoke({
        messages:[
            {
                role:"user",
                content:prompt
            }
        ]
    })
    console.log(response.messages)
    return res.json(response.messages[response.messages.length-1].content)
})


app.listen(PORT,()=>{
    console.log(`Server is listening to PORT : ${PORT}`)
})