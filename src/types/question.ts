export interface KeyPoint {
  _id?: string;
  point?: string;
}

export interface AnswerDetail {
  explanation: string;
  keyPoints?: KeyPoint[];
}

export interface Question {
  _id: string;
  title: string;
  technology: string;
  difficulty: "Easy" | "Medium" | "Hard";
  importanceTag: string;
  easyAnswer: AnswerDetail;
  advancedAnswer: AnswerDetail;
  createdAt: string;
  updatedAt: string;
}