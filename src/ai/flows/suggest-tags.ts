'use server';

/**
 * @fileOverview This file contains the Genkit flow for suggesting relevant tags for documents based on their content.
 *
 * - suggestTags - A function that takes document content as input and returns a list of suggested tags.
 * - SuggestTagsInput - The input type for the suggestTags function.
 * - SuggestTagsOutput - The return type for the suggestTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTagsInputSchema = z.object({
  documentContent: z
    .string() // Changed from photoDataUri to documentContent
    .describe('The content of the document for which to suggest tags.'),
});
export type SuggestTagsInput = z.infer<typeof SuggestTagsInputSchema>;

const SuggestTagsOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe('An array of suggested tags for the document.'),
});
export type SuggestTagsOutput = z.infer<typeof SuggestTagsOutputSchema>;

export async function suggestTags(input: SuggestTagsInput): Promise<SuggestTagsOutput> {
  return suggestTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTagsPrompt',
  input: {schema: SuggestTagsInputSchema},
  output: {schema: SuggestTagsOutputSchema},
  prompt: `You are an expert at document categorization. Analyze the following document content and suggest relevant tags to improve discoverability and organization.

Document Content: {{{documentContent}}}

Based on the content above, suggest a list of tags that would be helpful for categorizing and retrieving this document. Return ONLY a JSON array of strings.`, // Updated the prompt
});

const suggestTagsFlow = ai.defineFlow(
  {
    name: 'suggestTagsFlow',
    inputSchema: SuggestTagsInputSchema,
    outputSchema: SuggestTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
