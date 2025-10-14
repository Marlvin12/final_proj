// src/hooks/useAIRecommendations.ts
import { useState, useEffect } from 'react';

interface UseAIRecommendationsProps {
  score: number;
  level: string;
  categoryScores: any[];
  weakest: any;
}

export function useAIRecommendations({ score, level, categoryScores, weakest }: UseAIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/ai-recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            score,
            level,
            categoryScores,
            weakest: weakest.name
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        setRecommendations(data.recommendations);
      } catch (err) {
        console.error('Error fetching AI recommendations:', err);
        setError('Failed to generate AI recommendations');
        // Fallback to default recommendations
        setRecommendations(getDefaultRecommendations(level));
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, [score, level, categoryScores, weakest]);

  return { recommendations, isLoading, error };
}

// Fallback recommendations if AI fails
function getDefaultRecommendations(level: string): string[] {
  if (level === 'low') {
    return [
      'Validate your market via 5-10 customer interviews to understand real customer needs',
      'Draft a one-sentence value proposition and test with prospects',
      'Define a single revenue model hypothesis and run a small pilot',
      'Build an MVP with the smallest set of features to learn quickly'
    ];
  }
  
  if (level === 'medium') {
    return [
      'Tighten your acquisition channel: pick one channel and set weekly targets',
      'Formalize basic ops (onboarding, support) in a one-page playbook',
      'Track 2-3 metrics (activation rate, CAC, runway) in a simple dashboard',
      'Iterate on pricing with A/B experiments across 2 price points'
    ];
  }
  
  return [
    'Systematize growth: automate your best-performing channel before adding new ones',
    'Strengthen the team with complementary skills and clear ownership',
    'Introduce quarterly goals (OKRs) tied to leading indicators',
    'De-risk dependencies via runbooks and periodic recovery drills'
  ];
}