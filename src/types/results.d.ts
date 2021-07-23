const results = ["regions", "suggestions", "results"] as const;

const resultsTitles = ["Available regions", "Suggesstions", "Search Results"];

export type ResultsType = typeof results[number];
export type ResultsTitlesType = typeof resultsTitles[number];
export default results;
