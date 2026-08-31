export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Language"
  | "Styling";

export type BadgeTone = "warning" | "accent" | "success" | "info";

export interface TechStackItem {
  id: string;
  name: string;
  slug: string;
  category: TechCategory;
  questionCount: number;
  badgeText: string;
  badgeTone: BadgeTone;
  challengeQuestion: string;
  iconName: string;
}