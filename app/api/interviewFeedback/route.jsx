import { Summery } from "@/services/Constents";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { summery } = await req.json();

  const Final_promt = Summery.replace(
    "{{conversation}}",
    JSON.stringify(summery)
  );

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
