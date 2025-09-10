// types/index.ts
// Shared TypeScript interfaces for the Business Assessment App
// Everyone imports these to ensure consistent data structures

export interface User {
  id: string;
  full_name: string;
  created_at: string;
  last_login?: string;
  role?: string;
}

export interface QuestionnaireResponse {
  id: string;
  user_id: string;
  answers: QuestionnaireAnswers;
  score: number;
  stage: BusinessStage;
  created_at: string;
}

export interface QuestionnaireAnswers {
  questions: Question[];
}

export interface Question {
  id: string;
  question_text: string;
  answer_type: "multiple_choice" | "short_answer";
  options?: string[];
  selected_option: string;
  score: number;
}

export type BusinessStage = "Idea" | "Research" | "Planning" | "Launch" | "Scaling";

export interface Recommendation {
  id: string;
  response_id: string;
  recommendation_text: string;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SubmitQuestionnaireRequest {
  answers: QuestionnaireAnswers;
}

export interface SubmitQuestionnaireResponse {
  response_id: string;
  score: number;
  stage: BusinessStage;
  recommendations?: Recommendation[];
}