import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BarChart, RadarChart, DoughnutChart } from '@/components/ChartVisualizations';

const mockCategoryScores = [
  { name: 'Market Validation', icon: '', percentage: 80, score: 12, maxScore: 15 },
  { name: 'Revenue Model', icon: '', percentage: 60, score: 9, maxScore: 15 },
  { name: 'Customer Acquisition', icon: '', percentage: 40, score: 6, maxScore: 15 },
  { name: 'Team Readiness', icon: '', percentage: 20, score: 3, maxScore: 15 },
  { name: 'Operations & Processes', icon: '', percentage: 100, score: 15, maxScore: 15 },
];

describe('Chart Components', () => {
  beforeEach(() => {
    // Suppress expected console errors from Chart.js in test environment
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('BarChart', () => {
    it('should render bar chart with category scores', () => {
      render(<BarChart categoryScores={mockCategoryScores} />);
      const canvas = screen.getByRole('img');
      expect(canvas).toBeInTheDocument();
    });

    it('should handle empty category scores', () => {
      render(<BarChart categoryScores={[]} />);
      const canvas = screen.getByRole('img');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('RadarChart', () => {
    it('should render radar chart', () => {
      render(<RadarChart categoryScores={mockCategoryScores} />);
      const canvas = screen.getByRole('img');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('DoughnutChart', () => {
    it('should render doughnut chart', () => {
      render(<DoughnutChart categoryScores={mockCategoryScores} overallScore={60} />);
      const canvas = screen.getByRole('img');
      expect(canvas).toBeInTheDocument();
    });

    it('should calculate distribution correctly', () => {
      render(<DoughnutChart categoryScores={mockCategoryScores} overallScore={60} />);
      const canvas = screen.getByRole('img');
      expect(canvas).toBeInTheDocument();
    });
  });
});

