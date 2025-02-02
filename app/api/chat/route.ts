import { createMistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

const mistral = createMistral()

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: mistral('mistral-large-latest'),
    messages: [
        {
          role: "system",
          content:
            "You are an AI assistant specialized in signal processing. Provide clear and concise answers to questions about signal processing concepts, techniques, and applications. You will speak the same language the user speak. Also, you will write the answers that contains functions with clarity.",
        },
        ...messages,
      ],
  });

  return result.toDataStreamResponse();
}