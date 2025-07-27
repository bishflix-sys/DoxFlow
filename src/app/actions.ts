"use server";

import { summarizeDocument, SummarizeDocumentInput, SummarizeDocumentOutput } from "@/ai/flows/summarize-document";
import { suggestTags, SuggestTagsInput, SuggestTagsOutput } from "@/ai/flows/suggest-tags";

export async function handleSummarize(input: SummarizeDocumentInput): Promise<SummarizeDocumentOutput> {
  try {
    const summary = await summarizeDocument(input);
    return summary;
  } catch (error) {
    console.error("Error summarizing document:", error);
    throw new Error("Failed to summarize document.");
  }
}

export async function handleSuggestTags(input: SuggestTagsInput): Promise<SuggestTagsOutput> {
  try {
    const tags = await suggestTags(input);
    return tags;
  } catch (error) {
    console.error("Error suggesting tags:", error);
    throw new Error("Failed to suggest tags.");
  }
}
