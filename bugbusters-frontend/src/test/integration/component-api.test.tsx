import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useAIRecommendations } from '@/hooks/useAiRecommendtion';

global.fetch = vi.fn();

describe('Component-API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress expected console errors
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('useAIRecommendations Hook Integration', () => {
    it('should fetch and display recommendations', async () => {
      const mockRecommendations = [
        'Validate your market via customer interviews',
        'Draft a value proposition',
        'Build an MVP',
      ];

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: async () => ({ recommendations: mockRecommendations }),
      });

      const TestComponent = () => {
        const { recommendations, isLoading, error } = useAIRecommendations({
          score: 65,
          level: 'medium',
          categoryScores: [],
          weakest: { name: 'Market Validation' },
        });

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        return (
          <div>
            {recommendations.map((rec, idx) => (
              <div key={idx}>{rec}</div>
            ))}
          </div>
        );
      };

      render(<TestComponent />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });

      expect(screen.getByText(mockRecommendations[0])).toBeInTheDocument();
      expect(screen.getByText(mockRecommendations[1])).toBeInTheDocument();
      expect(screen.getByText(mockRecommendations[2])).toBeInTheDocument();
    });

    it('should handle API errors and show fallback recommendations', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error('Network error')
      );

      const TestComponent = () => {
        const { recommendations, isLoading, error } = useAIRecommendations({
          score: 30,
          level: 'low',
          categoryScores: [],
          weakest: { name: 'Market Validation' },
        });

        if (isLoading) return <div>Loading...</div>;

        return (
          <div>
            {error && <div>Error: {error}</div>}
            {recommendations.map((rec, idx) => (
              <div key={idx} data-testid={`recommendation-${idx}`}>{rec}</div>
            ))}
          </div>
        );
      };

      render(<TestComponent />);

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });

      await waitFor(() => {
        const recommendations = screen.getAllByTestId(/recommendation-/);
        expect(recommendations.length).toBeGreaterThan(0);
      });

      const recommendations = screen.getAllByTestId(/recommendation-/);
      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations[0].textContent).toContain('customer');
    });
  });
});

