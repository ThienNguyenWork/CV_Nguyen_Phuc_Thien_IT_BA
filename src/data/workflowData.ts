export interface ProblemToSolutionStage {
  number: string;
  title: string;
  dimension: string;
  emphasis: string;
  supportingText: string;
  items: readonly string[];
}

export const problemToSolutionStages: readonly ProblemToSolutionStage[] = [
  {
    number: "01",
    title: "UNDERSTAND",
    dimension: "Business",
    emphasis: "BUSINESS PROBLEM",
    supportingText:
      "Understand the business context before defining the solution.",
    items: ["Goals", "Pain Points", "Stakeholders", "Constraints"],
  },
  {
    number: "02",
    title: "STRUCTURE",
    dimension: "Analysis",
    emphasis: "BA THINKING",
    supportingText:
      "Turn business needs and processes into something the team can understand and work with.",
    items: [
      "Requirements",
      "Process Mapping",
      "Business Rules",
      "Gap Analysis",
    ],
  },
  {
    number: "03",
    title: "SOLVE",
    dimension: "Solution",
    emphasis: "BUILDABLE SOLUTION",
    supportingText:
      "Translate validated requirements into practical solutions that developers and stakeholders can build and use.",
    items: ["BRD", "User Stories", "BPMN", "Wireframes", "System Flow"],
  },
] as const;
