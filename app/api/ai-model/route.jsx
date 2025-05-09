import { OpenAiPromt } from "@/services/Constents";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { JobPoestion, JobDescription, duration, type } = await req.json();

  const Final_promt = OpenAiPromt.replace("{{job Title}}", JobPoestion)
    .replace("{{jobDescription}}", JobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);
  console.log(Final_promt);
  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.NEXT_GENERATIVE_AI_KEY,
    });
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-prover-v2:free",
      messages: [{ role: "user", content: Final_promt }],
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (e) {
    return NextResponse.json(e);
  }
}
