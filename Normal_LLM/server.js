import express from "express" 
import dotenv from "dotenv"
dotenv.config()
import { ChatGoogle } from "@langchain/google";

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())


app.post("/chat",async(req,res)=>{
    const {prompt} = req.body;
    if(!prompt){
        return res.json({
            message:"Invalid Prompt."
        })
    }

    
    const ai = new ChatGoogle({
        model:"gemini-2.5-flash",
        temperature:0.7,
    });
    const response = await ai.invoke([
        {
            role:"system",
            content:"You are a female ai assistant name sanjana."
        },
        {
            role:"human",
            content:prompt
        }
    ]);

    return res.json(response.content)
})

app.listen(PORT,()=>{
    console.log(`Server is listening to PORT : ${PORT}`);
})