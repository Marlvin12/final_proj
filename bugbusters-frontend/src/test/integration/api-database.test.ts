import { describe, it, expect, vi, beforeEach } from 'vitest';
import { auth } from '@clerk/nextjs/server';
import { saveQuestionnaireResponse, saveRecommendation } from '@/lib/database';
import { supabase } from '@/lib/supabase';

vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('API-Database Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPENAI_API_KEY = 'test-api-key';
  });

  describe('AI Recommendation Flow', () => {
    it('should save questionnaire response and recommendations together', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 'user-123' });

      let savedResponseId: string | null = null;
      const savedRecommendations: string[] = [];

      const mockInsertResponse = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: 'response-123' },
            error: null,
          }),
        }),
      });

      const mockInsertRecommendation = vi.fn().mockResolvedValue({ error: null });

      (supabase.from as ReturnType<typeof vi.fn>).mockImplementation((table: string) => {
        if (table === 'questionnaire_responses') {
          return {
            insert: mockInsertResponse,
          };
        }
        if (table === 'recommendations') {
          return {
            insert: mockInsertRecommendation,
          };
        }
        return {};
      });

      savedResponseId = await saveQuestionnaireResponse(
        'user-123',
        { level: 'medium' },
        65,
        'Planning'
      );

      expect(savedResponseId).toBe('response-123');

      if (savedResponseId) {
        const recommendations = ['Rec 1', 'Rec 2', 'Rec 3'];
        for (const rec of recommendations) {
          const success = await saveRecommendation(savedResponseId, rec);
          if (success) {
            savedRecommendations.push(rec);
          }
        }
      }

      expect(savedRecommendations).toHaveLength(3);
      expect(mockInsertRecommendation).toHaveBeenCalledTimes(3);
    });

    it('should handle database errors during recommendation save', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 'user-123' });

      const mockInsertResponse = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: 'response-123' },
            error: null,
          }),
        }),
      });

      const mockInsertRecommendation = vi.fn().mockResolvedValue({
        error: { message: 'Database error' },
      });

      (supabase.from as ReturnType<typeof vi.fn>).mockImplementation((table: string) => {
        if (table === 'questionnaire_responses') {
          return {
            insert: mockInsertResponse,
          };
        }
        if (table === 'recommendations') {
          return {
            insert: mockInsertRecommendation,
          };
        }
        return {};
      });

      const responseId = await saveQuestionnaireResponse(
        'user-123',
        { level: 'medium' },
        65,
        'Planning'
      );

      expect(responseId).toBe('response-123');

      if (responseId) {
        const success = await saveRecommendation(responseId, 'Test recommendation');
        expect(success).toBe(false);
      }
    });
  });

  describe('Complete Assessment Flow', () => {
    it('should process full assessment workflow', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 'user-123' });

      const mockInsertResponse = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: 'response-123' },
            error: null,
          }),
        }),
      });

      const mockInsertRecommendation = vi.fn().mockResolvedValue({ error: null });

      (supabase.from as ReturnType<typeof vi.fn>).mockImplementation((table: string) => {
        if (table === 'questionnaire_responses') {
          return {
            insert: mockInsertResponse,
          };
        }
        if (table === 'recommendations') {
          return {
            insert: mockInsertRecommendation,
          };
        }
        return {};
      });

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: '1. First recommendation\n2. Second recommendation\n3. Third recommendation',
              },
            },
          ],
        }),
      });

      const responseId = await saveQuestionnaireResponse(
        'user-123',
        {
          market_validation: 'yes',
          revenue_model: 'yes',
          customer_acquisition: '3',
        },
        70,
        'Launch'
      );

      expect(responseId).toBe('response-123');

      if (responseId) {
        const recommendations = ['Rec 1', 'Rec 2', 'Rec 3'];
        for (const rec of recommendations) {
          await saveRecommendation(responseId, rec);
        }
      }

      expect(mockInsertResponse).toHaveBeenCalled();
      expect(mockInsertRecommendation).toHaveBeenCalledTimes(3);
    });
  });
});

