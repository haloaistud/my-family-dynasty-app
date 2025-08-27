'use server';
/**
 * @fileOverview An AI agent that suggests formatting and organization for photos or historical records to improve visual presentation.
 *
 * - suggestFormatting - A function that handles the formatting suggestion process.
 * - SuggestFormattingInput - The input type for the suggestFormatting function.
 * - SuggestFormattingOutput - The return type for the suggestFormatting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFormattingInputSchema = z.object({
  recordType: z
    .string()
    .describe('The type of record to format, e.g., photo, historical document, etc.'),
  recordDataUri: z
    .string()
    .describe(
      "The record's data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userPreferences: z
    .string()
    .optional()
    .describe('Optional user preferences or style guidelines.'),
});
export type SuggestFormattingInput = z.infer<typeof SuggestFormattingInputSchema>;

const SuggestFormattingOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of formatting and organization suggestions.'),
});
export type SuggestFormattingOutput = z.infer<typeof SuggestFormattingOutputSchema>;

export async function suggestFormatting(input: SuggestFormattingInput): Promise<SuggestFormattingOutput> {
  return suggestFormattingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFormattingPrompt',
  input: {schema: SuggestFormattingInputSchema},
  output: {schema: SuggestFormattingOutputSchema},
  prompt: `You are an expert in visual design and historical document preservation.

  Given a record of type "{{recordType}}" presented as {{media url=recordDataUri}}, and considering the user's preferences: "{{userPreferences}}", provide specific formatting and organization suggestions to enhance its visual presentation.

  Suggestions should improve visual appeal and ease of understanding for family history purposes.
  Format your output as a numbered list of suggestions.
  If no user preferences are specified, use your expert judgement.
  `,
});

const suggestFormattingFlow = ai.defineFlow(
  {
    name: 'suggestFormattingFlow',
    inputSchema: SuggestFormattingInputSchema,
    outputSchema: SuggestFormattingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

