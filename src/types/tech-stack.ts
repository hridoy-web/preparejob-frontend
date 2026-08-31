export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Language"
  | "Styling";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TechStackItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  questionCount: number;
  difficulty: "Easy" | "Medium" | "Hard";
  challengeQuestion: string;
  iconName: string;
}