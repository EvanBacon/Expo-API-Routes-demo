import { ExpoRequest, ExpoResponse } from "expo-router/server";

export async function GET(req: ExpoRequest): Promise<ExpoResponse> {
  return ExpoResponse.json({ message: "Hello, world" });
}

export async function POST(req: ExpoRequest): Promise<ExpoResponse> {
  const { prompt } = await req.json();
  console.log("prompt:", prompt);

  const payload = {
    prompt,
    max_tokens: 100, // You can customize this
  };

  const json = FIXTURES.success;
  //   const json = await fetch(
  //     "https://api.openai.com/v1/engines/text-davinci-003/completions",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
  //       },
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //     }
  //   ).then((res) => res.json());

  // console.log(JSON.stringify(json, null, 2));
  return ExpoResponse.json(json);
}

const FIXTURES = {
  success: {
    id: "xxx",
    object: "text_completion",
    created: 1693867409,
    model: "text-davinci-003",
    choices: [
      {
        text: "\n\n1. Author of Expo Router. Building API Routes for Expo. Coding enthusiast. Passionate about creating new, efficient versions of old solutions. \n\n2. Using Expo Router to build API Routes for developers. Combining my passion for coding and solutions to create powerful, intuitive products.",
        index: 0,
        logprobs: null,
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 55,
      completion_tokens: 63,
      total_tokens: 118,
    },
  },
  error: {
    error: {
      message:
        "You exceeded your current quota, please check your plan and billing details.",
      type: "insufficient_quota",
      param: null,
      code: "insufficient_quota",
    },
  },
};
