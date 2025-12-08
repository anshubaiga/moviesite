import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // .env file load

const openai = new OpenAI({
  apiKey: process.env.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,
});

async function run() {
  const response = await openai.responses.create({
    model: "gpt-5-nano",
    input: "write a haiku about ai"
  });

  console.log(response.output_text);
}

run();
