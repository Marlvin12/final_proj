import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  saveQuestionnaireResponse,
  saveRecommendation,
  getUserQuestionnaireResponses,
  getRecommendationsForResponse,
  createOrUpdateUser,
} from '@/lib/database';
import { supabase } from '@/lib/supabase';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('Database Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveQuestionnaireResponse', () => {
    it('should save questionnaire response successfully', async () => {
      const mockInsert = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: 'test-response-id' },
            error: null,
          }),
        }),
      });

      (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
        insert: mockInsert,
      });

      const result = await saveQuestionnaireResponse(
        'user-123',
        { level: 'medium' },
        65,
        'Planning'
      );

      expect(result).toBe('test-response-id');
      expect(supabase.from).toHaveBeenCalledWith('questionnaire_responses');
    });

    it('should return null when supabase is not initialized', async () => {
      const originalSupabase = supabase;
      (supabase as unknown) = null;

      const result = await saveQuestionnaireResponse(
        'user-123',
        { level: 'medium' },
        65,
        'Planning'
      );

      expect(result).toBeNull();

      (supabase as unknown) = originalSupabase;
    });

    it('should handle database errors', async () => {
      const mockInsert = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { message: 'Database error' },
          }),
        }),
      });

      (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
        insert: mockInsert,
      });

      const result = await saveQuestionnaireResponse(
        'user-123',
        { level: 'medium' },
        65,
        'Planning'
      );

      expect(result).toBeNull();
    });
  });

  describe('saveRecommendation', () => {
    it('should save recommendation successfully', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null });

      (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
        insert: mockInsert,
      });

      const result = await saveRecommendation('response-123', 'Test recommendation');

      expect(result).toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('recommendations');
      expect(mockInsert).toHaveBeenCalledWith({
        response_id: 'response-123',
        recommendation_text: 'Test recommendation',
      });
    });

    it('should return false on error', async () => {
      const mockInsert = vi.fn().mockResolvedValue({
        error: { message: 'Database error' },
      });

      (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
        insert: mockInsert,
      });

      const result = await saveRecommendation('response-123', 'Test recommendation');

      expect(result).toBe(false);
    });
  });

  describe('getUserQuestionnaireResponses', () => {
    it('should fetch user questionnaire responses', async () => {
      const mockData = [
        {
          id: 'response-1',
          user_id: 'user-123',
          score: 65,
          stage: 'Planning',
          created_at: '2024-01-01T00:00:00Z',
        },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockData,
        error: null,
      });

      const mockEq = vi.fn().mockReturnValue({
        order: mockOrder,
      });

      const mockSelect = vi.fn().mockReturnValue({
        eq: mockEq,
      });

      (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
        select: mockSelect,
      });

      const result = await getUserQuestionnaireResponses('user-123');

      expect(result).toEqual(mockData);
      expect(mockEq).toHaveBeenCalledWith('user_id', 'user-123');
    });

    it('should return empty array on error', async () => {
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      });

      const mockEq = vi.fn().mockReturnValue({
        order: mockOrder,
      });

      const mockSelect = vi.fn().mockReturnValue({
        eq: mockEq,
      });

      (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
        select: mockSelect,
      });

      const result = await getUserQuestionnaireResponses('user-123');

      expect(result).toEqual([]);
    });
  });

  describe('getRecommendationsForResponse', () => {
    it('should fetch recommendations for a response', async () => {
      const mockData = [
        {
          id: 'rec-1',
          response_id: 'response-123',
          recommendation_text: 'Test recommendation',
          created_at: '2024-01-01T00:00:00Z',
        },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockData,
        error: null,
      });

      const mockEq = vi.fn().mockReturnValue({
        order: mockOrder,
      });

      const mockSelect = vi.fn().mockReturnValue({
        eq: mockEq,
      });

      (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
        select: mockSelect,
      });

      const result = await getRecommendationsForResponse('response-123');

      expect(result).toEqual(mockData);
      expect(mockEq).toHaveBeenCalledWith('response_id', 'response-123');
    });
  });

  describe('createOrUpdateUser', () => {
    it('should create or update user successfully', async () => {
      const mockUpsert = vi.fn().mockResolvedValue({ error: null });

      (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
        upsert: mockUpsert,
      });

      const result = await createOrUpdateUser('user-123', 'Test User');

      expect(result).toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('users');
      expect(mockUpsert).toHaveBeenCalledWith({
        id: 'user-123',
        full_name: 'Test User',
        last_login: expect.any(String),
      });
    });

    it('should return false on error', async () => {
      const mockUpsert = vi.fn().mockResolvedValue({
        error: { message: 'Database error' },
      });

      (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
        upsert: mockUpsert,
      });

      const result = await createOrUpdateUser('user-123', 'Test User');

      expect(result).toBe(false);
    });
  });
});

