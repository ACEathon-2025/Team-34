import { pipeline } from "@xenova/transformers";

let sentimentPipeline;
let classifierPipeline;

const categories = [
  "pothole or road damage",
  "garbage or waste management",
  "water supply or leakage",
  "streetlight or electricity issue",
  "noise pollution or disturbance",
];

export async function analyzeComplaint(text) {
  try {
    if (!sentimentPipeline)
      sentimentPipeline = await pipeline("sentiment-analysis");
    if (!classifierPipeline)
      classifierPipeline = await pipeline("zero-shot-classification");

    console.log("Analyzing complaint text:", text);

    const sentimentResult = await sentimentPipeline(text);
    console.log("Sentiment result:", sentimentResult);

    const classificationResult = await classifierPipeline(text, categories);
    console.log("Category result:", classificationResult);

    return {
      sentiment: sentimentResult[0].label,
      category: classificationResult.labels[0],
      confidence: Number((classificationResult.scores[0] * 100).toFixed(2)),
    };
  } catch (error) {
    console.error("Error in ML analysis:", error);
    return {
      sentiment: "UNKNOWN",
      category: "UNCATEGORIZED",
      confidence: 0,
    };
  }
}
