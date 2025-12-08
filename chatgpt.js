import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // .env file load

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  const response = await openai.responses.create({
    model: "gpt-5-nano",
    input: "write a haiku about ai"
  });

  console.log(response.output_text);
}

run();
