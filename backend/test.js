import { analyzeComplaint } from "./ml/mlAnalyzer.js";

async function runTest() {
  const complaints = [
    {
      title: "Loud construction near school",
      description:
        "Construction noise starts at 6 AM near the local school, disturbing students and teachers",
    },
    {
      title: "Streetlight not working",
      description: "The streetlight near my house has been off for 2 weeks.",
    },
    {
      title: "Pothole on 5th Avenue",
      description:
        "There is a huge pothole on 5th Avenue, and cars keep getting damaged",
    },
    {
      title: "Overflowing garbage",
      description:
        "Garbage collection has stopped, and trash is piling up in my neighborhood",
    },
  ];

  for (const c of complaints) {
    const text = `${c.title} ${c.description}`;
    const result = await analyzeComplaint(text);
    console.log("Title:", c.title);
    console.log("Sentiment:", result.sentiment);
    console.log("Category:", result.category);
    console.log("Confidence:", result.confidence, "%");
  }
}

runTest();
