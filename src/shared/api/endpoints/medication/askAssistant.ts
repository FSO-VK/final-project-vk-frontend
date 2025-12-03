import { backendClient } from '../../client';

import * as z from 'zod/mini';

export interface AskAssistantOptions {
  medicationId: string;
  query: string;
}

export const AskAssistantDTO = z.object({
  llmAnswer: z.string(),
});

export async function askAssistant(
  options: AskAssistantOptions,
): Promise<z.infer<typeof AskAssistantDTO>> {
  const body = await backendClient.get(`/medication/medication/${options.medicationId}/assistant`, {
    useCredentials: true,
    query: {
      question: options.query,
    },
  });
  return AskAssistantDTO.parse(body);
}

export async function askAssistantMock(
  options: AskAssistantOptions,
): Promise<z.infer<typeof AskAssistantDTO>> {
  return await Promise.resolve({
    llmAnswer: `Я всего лишь моковый ответ на запрос: "${options.medicationId}::${options.query}", не требуй от меня больше`,
  });
}
