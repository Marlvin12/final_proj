import { supabase } from './supabase';

export type QuestionnaireResponse = {
  id?: string;
  user_id: string;
  answers: Record<string, string | number>;
  score: number;
  stage: 'Idea' | 'Research' | 'Planning' | 'Launch' | 'Scaling';
  created_at?: string;
};

export type Recommendation = {
  id?: string;
  response_id: string;
  recommendation_text: string;
  created_at?: string;
};

export async function saveQuestionnaireResponse(
  userId: string,
  answers: Record<string, string | number>,
  score: number,
  stage: 'Idea' | 'Research' | 'Planning' | 'Launch' | 'Scaling'
): Promise<string | null> {
  try {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return null;
    }

    const { data, error } = await supabase
      .from('questionnaire_responses')
      .insert({
        user_id: userId,
        answers,
        score,
        stage,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving questionnaire response:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Attempted to save:', { userId, score, stage });
      return null;
    }

    console.log('Successfully saved assessment:', data?.id);
    return data?.id || null;
  } catch (err) {
    console.error('Unexpected error saving questionnaire response:', err);
    return null;
  }
}

export async function saveRecommendation(
  responseId: string,
  recommendationText: string
): Promise<boolean> {
  try {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return false;
    }

    const { error } = await supabase
      .from('recommendations')
      .insert({
        response_id: responseId,
        recommendation_text: recommendationText,
      });

    if (error) {
      console.error('Error saving recommendation:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error saving recommendation:', err);
    return false;
  }
}

export async function getUserQuestionnaireResponses(
  userId: string
): Promise<QuestionnaireResponse[]> {
  try {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return [];
    }

    const { data, error} = await supabase
      .from('questionnaire_responses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching questionnaire responses:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching questionnaire responses:', err);
    return [];
  }
}

export async function getRecommendationsForResponse(
  responseId: string
): Promise<Recommendation[]> {
  try {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return [];
    }

    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .eq('response_id', responseId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching recommendations:', err);
    return [];
  }
}

export async function createOrUpdateUser(
  userId: string,
  fullName?: string
): Promise<boolean> {
  try {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return false;
    }

    const { error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        full_name: fullName,
        last_login: new Date().toISOString(),
      });

    if (error) {
      console.error('Error creating/updating user:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error creating/updating user:', err);
    return false;
  }
}

