import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.openai_api_key,
});

if (!config.apiKey) throw new Error("openai_api_key is not defined");

const openai = new OpenAIApi(config);

export async function POST(request) {
  const body = await request.json();

  if (!body.prompt || body.prompt.length === 0) {
    return NextResponse.error(new Error("Prompt is required"), {
      status: 400,
    });
  }
  try {
    const response = await openai.createCompletion({
      prompt: body.prompt,
      model: "text-davinci-003",
      temperature: 0.7,
      max_tokens: 60,
    });
    return NextResponse.json(response.data.choices[0].text);
  } catch (error) {
    return NextResponse.error(error, {
      status: 500,
    });
  }
}
