/**
 * @fileOverview An AI agent that simulates searching public records for family history research.
 *
 * - searchPublicRecords - A function that handles the public records search process.
 * - PublicRecordsSearchInput - The input type for the searchPublicRecords function.
 * - PublicRecordsSearchOutput - The return type for the searchPublicRecords function.
 */
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PublicRecordsSearchInputSchema = z.object({
  query: z.string().describe('The search query (e.g., name, location, date range).'),
});
export type PublicRecordsSearchInput = z.infer<typeof PublicRecordsSearchInputSchema>;

const SimulatedRecordSchema = z.object({
    type: z.string().describe("The type of record, e.g., 'Census', 'Birth Certificate', 'Military Draft Card'."),
    title: z.string().describe("A descriptive title for the record."),
    summary: z.string().describe("A summary of the information contained in the record."),
    date: z.string().describe("The date of the record."),
    location: z.string().describe("The location associated with the record."),
});

const PublicRecordsSearchOutputSchema = z.object({
  records: z.array(SimulatedRecordSchema).describe('An array of simulated historical records found.'),
  searchSummary: z.string().describe('A brief summary of the search results.'),
});
export type PublicRecordsSearchOutput = z.infer<typeof PublicRecordsSearchOutputSchema>;

export async function searchPublicRecords(input: PublicRecordsSearchInput): Promise<PublicRecordsSearchOutput> {
  const searchPublicRecordsFlow = ai.defineFlow(
    {
      name: 'searchPublicRecordsFlow',
      inputSchema: PublicRecordsSearchInputSchema,
      outputSchema: PublicRecordsSearchOutputSchema,
    },
    async (input) => {
      const prompt = ai.definePrompt({
        name: 'publicRecordsSearchPrompt',
        input: {schema: PublicRecordsSearchInputSchema},
        output: {schema: PublicRecordsSearchOutputSchema},
        prompt: `You are a helpful genealogy assistant AI. Your task is to simulate a search for historical public records based on a user's query. Generate a realistic but fictional set of records that match the query.

  User Query: "{{query}}"

  Generate a list of 2-3 simulated records. For each record, provide a plausible type, title, summary, date, and location. Also provide a brief summary of the search results. The data should feel authentic but must be clearly marked as simulated. Do not use real people's data.
  `,
      });

      const {output} = await prompt(input);
      return output!;
    }
  );

  return searchPublicRecordsFlow(input);
}
