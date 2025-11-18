import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAIRecommendations } from '@/hooks/useAiRecommendtion';

global.fetch = vi.fn();

describe('useAIRecommendations Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress expected console errors
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch recommendations successfully', async () => {
    const mockRecommendations = ['Recommendation 1', 'Recommendation 2'];

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ recommendations: mockRecommendations }),
    });

    const { result } = renderHook(() =>
      useAIRecommendations({
        score: 65,
        level: 'medium',
        categoryScores: [],
        weakest: { name: 'Market Validation' },
      })
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.recommendations).toEqual(mockRecommendations);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors gracefully', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() =>
      useAIRecommendations({
        score: 65,
        level: 'medium',
        categoryScores: [],
        weakest: { name: 'Market Validation' },
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.recommendations.length).toBeGreaterThan(0);
  });

  it('should provide default recommendations for low level', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Network error')
    );

    const { result } = renderHook(() =>
      useAIRecommendations({
        score: 30,
        level: 'low',
        categoryScores: [],
        weakest: { name: 'Market Validation' },
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.recommendations.length).toBeGreaterThan(0);
    expect(result.current.recommendations[0]).toContain('customer interviews');
  });

  it('should provide default recommendations for medium level', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Network error')
    );

    const { result } = renderHook(() =>
      useAIRecommendations({
        score: 55,
        level: 'medium',
        categoryScores: [],
        weakest: { name: 'Revenue Model' },
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.recommendations.length).toBeGreaterThan(0);
    expect(result.current.recommendations[0]).toContain('acquisition channel');
  });

  it('should provide default recommendations for high level', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Network error')
    );

    const { result } = renderHook(() =>
      useAIRecommendations({
        score: 85,
        level: 'high',
        categoryScores: [],
        weakest: { name: 'Operations & Processes' },
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.recommendations.length).toBeGreaterThan(0);
    expect(result.current.recommendations[0]).toContain('Systematize');
  });
});

