export interface TechStackItem {
  id: string;
  name: string;
  slug: string;
  category: "Frontend" | "Backend" | "Language" | "Styling";
  questionCount: number;
  badgeText: string;
  challengeQuestion: string;
  iconName: string;
}