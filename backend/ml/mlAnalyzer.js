import { pipeline } from "@xenova/transformers";

let sentimentPipeline;
let classifierPipeline;

const categories = [
  "pothole or road damage",
  "garbage or waste management",
  "water supply or leakage",
  "streetlight or electricity issue",
  "noise pollution",
];

export async function analyzeComplaint(text) {
  try {
    if (!sentimentPipeline)
      sentimentPipeline = await pipeline("sentiment-analysis");
    if (!classifierPipeline)
      classifierPipeline = await pipeline("zero-shot-classification");

    const sentimentResult = await sentimentPipeline(text);

    const classificationResult = await classifierPipeline(text, categories);

    return {
      sentiment: sentimentResult[0].label,
      sentimentConfidence: Number((sentimentResult[0].score * 100).toFixed(2)),
      category: classificationResult.labels[0],
      confidence: Number((classificationResult.scores[0] * 100).toFixed(2)),
    };
  } catch (error) {
    console.error("Error in ML analysis:", error);
    return {
      sentiment: "UNKNOWN",
      sentimentConfidence: 0,
      category: "UNCATEGORIZED",
      confidence: 0,
    };
  }
}
