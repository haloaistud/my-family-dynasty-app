'use server';
/**
 * @fileOverview An AI agent that analyzes family stories for administrative purposes.
 * 
 * - analyzeStory - A function that handles the story analysis process.
 * - AnalyzeStoryInput - The input type for the analyzeStory function.
 * - AnalyzeStoryOutput - The return type for the analyzeStory function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeStoryInputSchema = z.object({
  story: z.string().describe('The family story text to be analyzed.'),
});
export type AnalyzeStoryInput = z.infer<typeof AnalyzeStoryInputSchema>;

const AnalyzeStoryOutputSchema = z.object({
  sentiment: z.enum(['Positive', 'Negative', 'Neutral']).describe('The overall sentiment of the story.'),
  summary: z.string().describe('A brief summary of the story.'),
  tags: z.array(z.string()).describe('A list of relevant tags (e.g., wedding, birth, achievement).'),
  issues: z.array(z.string()).describe('A list of potential issues like sensitive content or privacy concerns.'),
  isAppropriate: z.boolean().describe('Whether the story is appropriate for a general family audience.'),
});
export type AnalyzeStoryOutput = z.infer<typeof AnalyzeStoryOutputSchema>;

export async function analyzeStory(input: AnalyzeStoryInput): Promise<AnalyzeStoryOutput> {
  return analyzeStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeStoryPrompt',
  input: { schema: AnalyzeStoryInputSchema },
  output: { schema: AnalyzeStoryOutputSchema },
  prompt: `You are an AI assistant for a family history app. Your role is to analyze user-submitted family stories for administrative review.
  
  Analyze the following story:
  "{{story}}"
  
  Your analysis should include:
  1.  **Sentiment**: Determine if the story's tone is Positive, Negative, or Neutral.
  2.  **Summary**: Provide a concise one-sentence summary.
  3.  **Tags**: Generate up to 5 relevant tags (e.g., "wedding", "childhood", "military service", "immigration").
  4.  **Issues**: Identify any potentially sensitive content, personal identifiable information (PII) that should be private, or violations of community guidelines. If none, return an empty array.
  5.  **Appropriateness**: Based on the issues, determine if the story is appropriate for a general family audience.
  `,
});

const analyzeStoryFlow = ai.defineFlow(
  {
    name: 'analyzeStoryFlow',
    inputSchema: AnalyzeStoryInputSchema,
    outputSchema: AnalyzeStoryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
