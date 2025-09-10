// lib/mocks.ts
// Mock data and functions for frontend development
// Use these while backend/AI integration is being built

import type { 
  QuestionnaireResponse, 
  Recommendation, 
  QuestionnaireAnswers,
  BusinessStage,
  ApiResponse,
  SubmitQuestionnaireResponse 
} from '../types';

// Sample questionnaire answers for testing
export const mockQuestionnaireAnswers: QuestionnaireAnswers = {
  questions: [
    {
      id: "q1",
      question_text: "Do you have a business idea?",
      answer_type: "multiple_choice",
      options: ["No", "Yes, partially", "Yes, fully defined"],
      selected_option: "Yes, partially",
      score: 2
    },
    {
      id: "q2", 
      question_text: "Have you researched your target market?",
      answer_type: "multiple_choice",
      options: ["Not at all", "Some research", "Extensive research"],
      selected_option: "Some research",
      score: 1
    },
    {
      id: "q3",
      question_text: "Do you have a business plan?",
      answer_type: "multiple_choice", 
      options: ["No plan", "Basic outline", "Detailed business plan"],
      selected_option: "Basic outline",
      score: 1
    }
  ]
};

// Sample past responses
export const mockPastResponses: QuestionnaireResponse[] = [
  {
    id: "response-1",
    user_id: "user-123",
    answers: mockQuestionnaireAnswers,
    score: 4,
    stage: "Planning",
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: "response-2", 
    user_id: "user-123",
    answers: {
      questions: [
        {
          id: "q1",
          question_text: "Do you have a business idea?",
          answer_type: "multiple_choice",
          options: ["No", "Yes, partially", "Yes, fully defined"],
          selected_option: "No",
          score: 0
        }
      ]
    },
    score: 0,
    stage: "Idea",
    created_at: "2024-01-01T09:00:00Z"
  }
];

// Sample recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    response_id: "response-1",
    recommendation_text: "Based on your Planning stage, consider developing a detailed financial projection for the next 12 months. Focus on identifying your key revenue streams and major expenses.",
    created_at: "2024-01-15T10:35:00Z"
  },
  {
    id: "rec-2",
    response_id: "response-1", 
    recommendation_text: "Since you have some market research, now would be a good time to validate your assumptions by talking to potential customers directly. Consider conducting 10-15 customer interviews.",
    created_at: "2024-01-15T10:35:00Z"
  }
];

// Mock API functions - Frontend can use these before real backend is ready

export const mockSubmitQuestionnaire = async (
  answers: QuestionnaireAnswers
): Promise<ApiResponse<SubmitQuestionnaireResponse>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Calculate mock score
  const score = answers.questions.reduce((total, q) => total + q.score, 0);
  
  // Determine stage based on score
  let stage: BusinessStage;
  if (score <= 2) stage = "Idea";
  else if (score <= 5) stage = "Research"; 
  else if (score <= 8) stage = "Planning";
  else if (score <= 12) stage = "Launch";
  else stage = "Scaling";

  const responseId = `mock-response-${Date.now()}`;
  
  return {
    success: true,
    data: {
      response_id: responseId,
      score,
      stage,
      recommendations: mockRecommendations
    }
  };
};

export const mockGetPastResponses = async (): Promise<ApiResponse<QuestionnaireResponse[]>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: mockPastResponses
  };
};

export const mockGetRecommendations = async (
  responseId: string
): Promise<ApiResponse<Recommendation[]>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    success: true,
    data: mockRecommendations.filter(rec => rec.response_id === responseId)
  };
};