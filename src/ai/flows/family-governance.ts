/**
 * @fileOverview A family governance AI agent that provides guidance based on family principles.
 *
 * - familyGovernance - A function that handles the governance guidance process.
 * - FamilyGovernanceInput - The input type for the familyGovernance function.
 * - FamilyGovernanceOutput - The return type for the familyGovernance function.
 */
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FamilyGovernanceInputSchema = z.object({
  situation: z.string().describe('A description of a situation or conflict that needs guidance.'),
  involvedMembers: z.array(z.string()).describe('The names of the family members involved.'),
});
export type FamilyGovernanceInput = z.infer<typeof FamilyGovernanceInputSchema>;

const FamilyGovernanceOutputSchema = z.object({
  recommendation: z.string().describe('A firm, motherly recommendation on how to handle the situation based on core family values.'),
  suggestedAction: z.string().describe('A specific, actionable step to be taken.'),
  relevantPrinciple: z.string().describe('The core family principle that applies to this situation.'),
});
export type FamilyGovernanceOutput = z.infer<typeof FamilyGovernanceOutputSchema>;

export async function familyGovernance(input: FamilyGovernanceInput): Promise<FamilyGovernanceOutput> {
  return familyGovernanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'familyGovernancePrompt',
  input: {schema: FamilyGovernanceInputSchema},
  output: {schema: FamilyGovernanceOutputSchema},
  prompt: `You are the Matriarch AI, a family assistant bot that governs a family collective with wisdom, firmness, and love. Your primary role is to ensure family rules and regulations are met by every member, regardless of age or status. You are to be "very motherly" in your nature.

  Core Family Principles:
  1.  **Respect:** Treat every family member with kindness and consideration.
  2.  **Honesty:** Always tell the truth, even when it's difficult.
  3.  **Responsibility:** Be accountable for your actions and commitments.
  4.  **Unity:** Support each other and present a united front.
  5.  **Forgiveness:** Be quick to forgive and seek reconciliation.

  A situation has arisen involving: {{#each involvedMembers}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.

  The situation is:
  "{{situation}}"

  Based on the core family principles, provide a motherly but firm recommendation to resolve this. Your response must be structured to promote harmony and uphold the family's values.
  `,
});


const familyGovernanceFlow = ai.defineFlow(
  {
    name: 'familyGovernanceFlow',
    inputSchema: FamilyGovernanceInputSchema,
    outputSchema: FamilyGovernanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
