import { describe, it, expect } from 'vitest';

function computeScore(params: URLSearchParams): { score: number; level: 'low' | 'medium' | 'high' } {
  let total = 0;
  let count = 0;
  params.forEach((v) => {
    if (v === 'yes') {
      total += 5;
      count += 1;
    } else if (v === 'no') {
      total += 1;
      count += 1;
    } else if (!Number.isNaN(Number(v))) {
      const n = Number(v);
      if (Number.isFinite(n)) {
        total += n;
        count += 1;
      }
    }
  });
  const score = count > 0 ? Math.round((total / (count * 5)) * 100) : 0;
  const level = score < 40 ? 'low' : score < 70 ? 'medium' : 'high';
  return { score, level };
}

function computeCategoryScores(params: URLSearchParams) {
  const categories = {
    'Market Validation': {
      questions: ['market_validation', 'value_prop_clarity', 'traction'],
      icon: '',
      score: 0,
      maxScore: 0,
    },
    'Revenue Model': {
      questions: ['revenue_model', 'runway_months'],
      icon: '',
      score: 0,
      maxScore: 0,
    },
    'Customer Acquisition': {
      questions: ['customer_acquisition', 'mvp_status'],
      icon: '',
      score: 0,
      maxScore: 0,
    },
    'Team Readiness': {
      questions: ['team_readiness'],
      icon: '',
      score: 0,
      maxScore: 0,
    },
    'Operations & Processes': {
      questions: ['ops_process', 'risk_mgmt'],
      icon: '',
      score: 0,
      maxScore: 0,
    },
  };

  Object.entries(categories).forEach(([, category]) => {
    category.questions.forEach((questionId) => {
      const value = params.get(questionId);
      if (value === 'yes') {
        category.score += 5;
        category.maxScore += 5;
      } else if (value === 'no') {
        category.score += 1;
        category.maxScore += 5;
      } else if (value && !isNaN(Number(value))) {
        const numValue = Number(value);
        if (Number.isFinite(numValue)) {
          category.score += numValue;
          category.maxScore += 5;
        }
      }
    });
  });

  const categoryScores = Object.entries(categories).map(([name, data]) => ({
    name,
    icon: data.icon,
    percentage: data.maxScore > 0 ? Math.round((data.score / data.maxScore) * 100) : 0,
    score: data.score,
    maxScore: data.maxScore,
  }));

  const strongest = categoryScores.reduce((prev, current) =>
    current.percentage > prev.percentage ? current : prev
  );
  const weakest = categoryScores.reduce((prev, current) =>
    current.percentage < prev.percentage ? current : prev
  );

  return { categoryScores, strongest, weakest };
}

function generateRoadmap(level: 'low' | 'medium' | 'high', weakest: { name: string }) {
  if (level === 'low') {
    return {
      quickWin: 'Run 5 customer discovery interviews to validate your core assumptions',
      nextMilestone: `Focus on ${weakest.name.toLowerCase()}: build foundational elements over the next 3 months`,
      longTerm: 'Develop a clear business model and establish initial market presence',
    };
  }

  if (level === 'medium') {
    return {
      quickWin: `Improve ${weakest.name.toLowerCase()}: dedicate this week to addressing your weakest area`,
      nextMilestone: 'Build and test a lightweight MVP with 10-20 early adopters',
      longTerm: 'Develop repeatable acquisition channels and scale operations',
    };
  }

  return {
    quickWin: 'Systematize your best-performing channel and document the process',
    nextMilestone: 'Expand your team and automate key operational workflows',
    longTerm: 'Scale to new markets while maintaining operational excellence',
  };
}

describe('computeScore', () => {
  it('should calculate score correctly for yes answers', () => {
    const params = new URLSearchParams();
    params.set('q1', 'yes');
    params.set('q2', 'yes');
    params.set('q3', 'yes');

    const result = computeScore(params);
    expect(result.score).toBe(100);
    expect(result.level).toBe('high');
  });

  it('should calculate score correctly for no answers', () => {
    const params = new URLSearchParams();
    params.set('q1', 'no');
    params.set('q2', 'no');
    params.set('q3', 'no');

    const result = computeScore(params);
    expect(result.score).toBe(20);
    expect(result.level).toBe('low');
  });

  it('should calculate score correctly for numeric answers', () => {
    const params = new URLSearchParams();
    params.set('q1', '3');
    params.set('q2', '4');
    params.set('q3', '5');

    const result = computeScore(params);
    expect(result.score).toBe(80);
    expect(result.level).toBe('high');
  });

  it('should calculate score correctly for mixed answers', () => {
    const params = new URLSearchParams();
    params.set('q1', 'yes');
    params.set('q2', 'no');
    params.set('q3', '3');

    const result = computeScore(params);
    expect(result.score).toBe(60);
    expect(result.level).toBe('medium');
  });

  it('should return low level for scores below 40', () => {
    const params = new URLSearchParams();
    params.set('q1', 'no');
    params.set('q2', 'no');

    const result = computeScore(params);
    expect(result.level).toBe('low');
  });

  it('should return medium level for scores between 40 and 69', () => {
    const params = new URLSearchParams();
    params.set('q1', 'yes');
    params.set('q2', 'no');
    params.set('q3', 'no');

    const result = computeScore(params);
    expect(result.level).toBe('medium');
  });

  it('should return high level for scores 70 and above', () => {
    const params = new URLSearchParams();
    params.set('q1', 'yes');
    params.set('q2', 'yes');
    params.set('q3', '4');

    const result = computeScore(params);
    expect(result.level).toBe('high');
  });

  it('should handle empty params', () => {
    const params = new URLSearchParams();
    const result = computeScore(params);
    expect(result.score).toBe(0);
    expect(result.level).toBe('low');
  });
});

describe('computeCategoryScores', () => {
  it('should calculate category scores correctly', () => {
    const params = new URLSearchParams();
    params.set('market_validation', 'yes');
    params.set('value_prop_clarity', 'yes');
    params.set('traction', 'yes');
    params.set('revenue_model', 'no');
    params.set('runway_months', '3');
    params.set('customer_acquisition', 'yes');
    params.set('mvp_status', '4');
    params.set('team_readiness', 'yes');
    params.set('ops_process', 'no');
    params.set('risk_mgmt', '2');

    const result = computeCategoryScores(params);

    expect(result.categoryScores).toHaveLength(5);
    expect(result.categoryScores[0].name).toBe('Market Validation');
    expect(result.categoryScores[0].percentage).toBe(100);
    expect(result.strongest.name).toBe('Market Validation');
  });

  it('should identify weakest category correctly', () => {
    const params = new URLSearchParams();
    params.set('market_validation', 'no');
    params.set('value_prop_clarity', 'no');
    params.set('traction', 'no');
    params.set('revenue_model', 'yes');
    params.set('runway_months', 'yes');
    params.set('customer_acquisition', 'yes');
    params.set('mvp_status', 'yes');
    params.set('team_readiness', 'yes');
    params.set('ops_process', 'yes');
    params.set('risk_mgmt', 'yes');

    const result = computeCategoryScores(params);
    expect(result.weakest.name).toBe('Market Validation');
  });

  it('should handle missing question values', () => {
    const params = new URLSearchParams();
    params.set('market_validation', 'yes');

    const result = computeCategoryScores(params);
    expect(result.categoryScores).toHaveLength(5);
    expect(result.categoryScores[0].percentage).toBeGreaterThan(0);
  });
});

describe('generateRoadmap', () => {
  it('should generate roadmap for low level', () => {
    const weakest = { name: 'Market Validation' };
    const roadmap = generateRoadmap('low', weakest);

    expect(roadmap.quickWin).toContain('customer discovery');
    expect(roadmap.nextMilestone).toContain('market validation');
    expect(roadmap.longTerm).toContain('business model');
  });

  it('should generate roadmap for medium level', () => {
    const weakest = { name: 'Revenue Model' };
    const roadmap = generateRoadmap('medium', weakest);

    expect(roadmap.quickWin).toContain('revenue model');
    expect(roadmap.nextMilestone).toContain('MVP');
    expect(roadmap.longTerm).toContain('acquisition channels');
  });

  it('should generate roadmap for high level', () => {
    const weakest = { name: 'Operations & Processes' };
    const roadmap = generateRoadmap('high', weakest);

    expect(roadmap.quickWin).toContain('Systematize');
    expect(roadmap.nextMilestone).toContain('team');
    expect(roadmap.longTerm).toContain('Scale');
  });
});

