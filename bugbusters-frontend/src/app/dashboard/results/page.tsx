"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { ChartVisualizations } from "@/components/ChartVisualizations";
import { VoiceAdvice } from "@/components/VoiceAdvice";
import { saveQuestionnaireResponse } from "@/lib/database";

function computeScore(params: URLSearchParams): { score: number; level: "low" | "medium" | "high" } {
  let total = 0;
  let count = 0;
  params.forEach((v) => {
    if (v === "yes") {
      total += 5;
      count += 1;
    } else if (v === "no") {
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
  const level = score < 40 ? "low" : score < 70 ? "medium" : "high";
  return { score, level };
}
function adviceFor(level: "low" | "medium" | "high"): { title: string; items: string[] } {
  if (level === "low") {
    return {
      title: "Foundational Focus",
      items: [
        "Validate your market via 5-10 customer interviews.",
        "Draft a one-sentence value proposition and test with prospects.",
        "Define a single revenue model hypothesis and run a small pilot.",
        "Build an MVP with the smallest set of features to learn quickly.",
      ],
    };
  }
  if (level === "medium") {
    return {
      title: "Execute and Measure",
      items: [
        "Tighten your acquisition channel: pick one channel and set weekly targets.",
        "Formalize basic ops (onboarding, support) in a one-page playbook.",
        "Track 2-3 metrics (activation rate, CAC, runway) in a simple dashboard.",
        "Iterate on pricing with A/B experiments across 2 price points.",
      ],
    };
  }
  return {
    title: "Scale with Discipline",
    items: [
      "Systematize growth: automate your best-performing channel before adding new ones.",
      "Strengthen the team with complementary skills and clear ownership.",
      "Introduce quarterly goals (OKRs) tied to leading indicators.",
      "De-risk dependencies via runbooks and periodic recovery drills.",
    ],
  };
}

const computeCategoryScores = (params: URLSearchParams) => {
  const categories = {
    'Market Validation': {
      questions: ['market_validation', 'value_prop_clarity', 'traction'],
      icon: '📊',
      score: 0,
      maxScore: 0
    },
    'Revenue Model': {
      questions: ['revenue_model', 'runway_months'],
      icon: '💰',
      score: 0,
      maxScore: 0
    },
    'Customer Acquisition': {
      questions: ['customer_acquisition', 'mvp_status'],
      icon: '🎯',
      score: 0,
      maxScore: 0
    },
    'Team Readiness': {
      questions: ['team_readiness'],
      icon: '👥',
      score: 0,
      maxScore: 0
    },
    'Operations & Processes': {
      questions: ['ops_process', 'risk_mgmt'],
      icon: '⚙️',
      score: 0,
      maxScore: 0
    }
  };

  Object.entries(categories).forEach(([, category]) => {
    category.questions.forEach(questionId => {
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
    maxScore: data.maxScore
  }));

  const strongest = categoryScores.reduce((prev, current) => 
    current.percentage > prev.percentage ? current : prev
  );
  const weakest = categoryScores.reduce((prev, current) => 
    current.percentage < prev.percentage ? current : prev
  );

  return { categoryScores, strongest, weakest };
};

// Generate personalized roadmap based on level and weakest categories
type CategoryScore = {
  name: string;
  icon: string;
  percentage: number;
  score: number;
  maxScore: number;
};

const generateRoadmap = (level: "low" | "medium" | "high", weakest: CategoryScore) => {
  
  if (level === "low") {
    return {
      quickWin: "Run 5 customer discovery interviews to validate your core assumptions",
      nextMilestone: `Focus on ${weakest.name.toLowerCase()}: build foundational elements over the next 3 months`,
      longTerm: "Develop a clear business model and establish initial market presence"
    };
  }
  
  if (level === "medium") {
    return {
      quickWin: `Improve ${weakest.name.toLowerCase()}: dedicate this week to addressing your weakest area`,
      nextMilestone: "Build and test a lightweight MVP with 10-20 early adopters",
      longTerm: "Develop repeatable acquisition channels and scale operations"
    };
  }
  
  return {
    quickWin: "Systematize your best-performing channel and document the process",
    nextMilestone: "Expand your team and automate key operational workflows",
    longTerm: "Scale to new markets while maintaining operational excellence"
  };
};

// Curated resources mapped to categories
type ResourceItem = {
  title: string;
  url: string;
  description: string;
  type: string;
};

const getCuratedResources = (weakest: CategoryScore, categoryScores: CategoryScore[]) => {
  const resourceMap = {
    'Market Validation': [
      { title: 'Customer Development Guide', url: 'https://steveblank.com/2014/06/28/customer-development-manifesto-reasons-for-the-revolution-part-1/', description: 'Steve Blank\'s comprehensive guide to customer discovery and validation', type: 'Article' },
      { title: 'Y Combinator Startup School', url: 'https://www.startupschool.org/', description: 'Free online course covering market validation and startup fundamentals', type: 'Course' },
      { title: 'Value Proposition Canvas', url: 'https://www.strategyzer.com/canvas/value-proposition-canvas', description: 'Tool to design value propositions that customers want', type: 'Tool' },
      { title: 'The Mom Test', url: 'https://www.momtestbook.com/', description: 'How to talk to customers and learn if your business is a good idea', type: 'Book' }
    ],
    'Revenue Model': [
      { title: 'SBA Financial Planning Guide', url: 'https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan', description: 'Small Business Administration guide to financial planning and projections', type: 'Guide' },
      { title: 'Pricing Strategy Framework', url: 'https://review.firstround.com/the-price-is-right-essential-tips-for-nailing-your-pricing-strategy', description: 'First Round Review guide to pricing strategy and optimization', type: 'Guide' },
      { title: 'Business Model Canvas', url: 'https://www.strategyzer.com/canvas/business-model-canvas', description: 'Strategic management template for developing business models', type: 'Tool' },
      { title: 'SCORE Financial Templates', url: 'https://www.score.org/resource/financial-projections-template', description: 'Free financial projection templates from SCORE mentors', type: 'Template' }
    ],
    'Customer Acquisition': [
      { title: 'HubSpot Free CRM', url: 'https://www.hubspot.com/products/crm', description: 'Free customer relationship management software', type: 'Tool' },
      { title: 'Traction Book Resources', url: 'https://tractionbook.com/', description: '19 channels to get traction for your startup', type: 'Book' },
      { title: 'First Round Review', url: 'https://review.firstround.com/topics/go-to-market', description: 'Go-to-market strategies from top startup founders', type: 'Articles' },
      { title: 'Google Analytics Academy', url: 'https://analytics.google.com/analytics/academy/', description: 'Free courses on measuring and optimizing customer acquisition', type: 'Course' }
    ],
    'Team Readiness': [
      { title: 'Gust Equity Calculator', url: 'https://gust.com/launch/equity-calculator', description: 'Fair framework for dividing equity among founders and early employees', type: 'Calculator' },
      { title: 'First Round Talent Resources', url: 'https://review.firstround.com/topics/hiring', description: 'Hiring best practices from successful startups', type: 'Articles' },
      { title: 'Y Combinator Co-founder Guide', url: 'https://www.ycombinator.com/library/8g-how-to-find-the-right-co-founder', description: 'Finding and working with co-founders effectively', type: 'Guide' },
      { title: 'Culture Amp Resources', url: 'https://www.cultureamp.com/blog', description: 'Building high-performing teams and strong culture', type: 'Blog' }
    ],
    'Operations & Processes': [
      { title: 'SBA Operations Guide', url: 'https://www.sba.gov/business-guide/manage-your-business', description: 'Comprehensive guide to managing and scaling business operations', type: 'Guide' },
      { title: 'Notion Templates', url: 'https://www.notion.so/templates', description: 'Pre-built workspace templates for operations management', type: 'Tool' },
      { title: 'Process Street', url: 'https://www.process.st/', description: 'Workflow and process management software for teams', type: 'Tool' },
      { title: 'Lean Startup Principles', url: 'http://theleanstartup.com/principles', description: 'Build-measure-learn framework for efficient operations', type: 'Methodology' }
    ]
  };

  // Get resources for weakest categories (bottom 2)
  const weakCategories = categoryScores.filter(c => c.percentage < 60).sort((a, b) => a.percentage - b.percentage).slice(0, 2);
  
  type ResourceCategory = {
    category: string;
    icon: string;
    percentage: number;
    items: ResourceItem[];
  };
  
  const resources: ResourceCategory[] = [];
  weakCategories.forEach(cat => {
    const catResources = resourceMap[cat.name as keyof typeof resourceMap] || [];
    resources.push({
      category: cat.name,
      icon: cat.icon,
      percentage: cat.percentage,
      items: catResources
    });
  });
  
  // Always include at least one category
  if (resources.length === 0) {
    resources.push({
      category: weakest.name,
      icon: weakest.icon,
      percentage: weakest.percentage,
      items: resourceMap[weakest.name as keyof typeof resourceMap] || []
    });
  }
  
  return resources;
};

const ProgressBar = ({ percentage, icon, name }: { percentage: number; icon: string; name: string }) => {
  const getColor = (pct: number) => {
    if (pct >= 80) return 'bg-emerald-500';
    if (pct >= 60) return 'bg-blue-500';
    if (pct >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBgColor = (pct: number) => {
    if (pct >= 80) return 'bg-emerald-100';
    if (pct >= 60) return 'bg-blue-100';
    if (pct >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-medium text-gray-900">{name}</span>
        </div>
        <span className="text-lg font-bold text-gray-900">{percentage}%</span>
      </div>
      <div className={`w-full h-3 ${getBgColor(percentage)} rounded-full overflow-hidden`}>
        <div 
          className={`h-full ${getColor(percentage)} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const RadialGauge = ({ percentage, icon, name }: { percentage: number; icon: string; name: string }) => {
  const getColor = (pct: number) => {
    if (pct >= 80) return '#10b981';
    if (pct >= 60) return '#3b82f6';
    if (pct >= 40) return '#eab308';
    return '#ef4444';
  };

  const radius = 50;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={getColor(percentage)}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ 
              strokeDashoffset,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 0.5s ease-out'
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-lg font-bold text-gray-900">{percentage}%</div>
      </div>
    </div>
  );
};

export default function ResultsPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { userId } = useAuth();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { score, level } = useMemo(() => computeScore(params), [params]);
  const { categoryScores, strongest, weakest } = useMemo(() => computeCategoryScores(params), [params]);
  const roadmap = useMemo(() => generateRoadmap(level, weakest), [level, weakest]);
  const curatedResources = useMemo(() => getCuratedResources(weakest, categoryScores), [weakest, categoryScores]);
  const advice = useMemo(() => adviceFor(level), [level]);
  const [viewMode, setViewMode] = useState<'bars' | 'radial'>('bars');

  useEffect(() => {
    const saveAssessment = async () => {
      if (!userId || isSaved) return;

      const answers: Record<string, string | number> = {};
      params.forEach((value, key) => {
        const numValue = Number(value);
        answers[key] = isNaN(numValue) ? value : numValue;
      });

      const stage: 'Idea' | 'Research' | 'Planning' | 'Launch' | 'Scaling' = 
        score < 30 ? 'Idea' : 
        score < 50 ? 'Research' : 
        score < 70 ? 'Planning' : 
        score < 85 ? 'Launch' : 'Scaling';

      const responseId = await saveQuestionnaireResponse(userId, answers, score, stage);
      if (responseId) {
        setIsSaved(true);
      }
    };

    saveAssessment();
  }, [userId, params, score, isSaved]);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Call API to generate PDF
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score,
          level,
          categoryScores,
          roadmap,
          strongest: strongest.name,
          weakest: weakest.name,
          answers: Object.fromEntries(params.entries())
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `business-readiness-report-${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Assessment Results</h1>
          <p className="text-gray-600">Your current business readiness score and next steps.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="rounded-md bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isGeneratingPDF ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report
              </>
            )}
          </button>
          <button
            onClick={() => router.push("/dashboard/questions")}
            className="rounded-md border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-4 py-2 text-sm font-medium transition-colors"
          >
            Retake Assessment
          </button>
        </div>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-600 font-medium">Readiness Score</div>
          <div className="text-4xl font-bold mt-2 text-emerald-600">{score}%</div>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-600 font-medium">Level</div>
          <div className="text-2xl font-semibold mt-2 capitalize text-gray-900">{level}</div>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-600 font-medium">Stage Badge</div>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
            {level === 'high' ? '🚀 Scaling Founder' : level === 'medium' ? '📈 Growing Entrepreneur' : '💡 Early Stage Innovator'}
          </div>
        </div>
      </div>

      {/* Voice Advice */}
      <VoiceAdvice advice={advice.items} level={level} score={score} />

      {/* Personalized Action Roadmap */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🗺️</span>
          <h2 className="text-xl font-bold text-gray-900">Your Personalized Action Roadmap</h2>
        </div>
        <div className="space-y-4">
          <div className="border-l-4 border-emerald-500 pl-4 py-2">
            <div className="text-sm font-semibold text-emerald-700 mb-1">⚡ Quick Win (This Week)</div>
            <p className="text-gray-700">{roadmap.quickWin}</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="text-sm font-semibold text-blue-700 mb-1">🎯 Next Milestone (Next 3 Months)</div>
            <p className="text-gray-700">{roadmap.nextMilestone}</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <div className="text-sm font-semibold text-purple-700 mb-1">🌟 Long-Term Goal (6-12 Months)</div>
            <p className="text-gray-700">{roadmap.longTerm}</p>
          </div>
        </div>
      </div>

      {/* Chart Visualizations */}
      <ChartVisualizations categoryScores={categoryScores} overallScore={score} />

      {/* Category Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Category Breakdown</h2>
            <p className="text-gray-600 text-sm mt-1">Your business readiness across key areas</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('bars')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                viewMode === 'bars' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Bars
            </button>
            <button
              onClick={() => setViewMode('radial')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                viewMode === 'radial' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Radial
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 shadow-sm border border-emerald-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Key Insights</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-emerald-700">Your strongest area is {strongest.name} ({strongest.percentage}%)</span>
                , while <span className="font-semibold text-red-700">{weakest.name} needs the most attention ({weakest.percentage}%)</span>.
                Focus on improving your weaker categories to build a well-rounded business foundation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          {viewMode === 'bars' ? (
            <div className="space-y-6">
              {categoryScores.map((category) => (
                <ProgressBar
                  key={category.name}
                  percentage={category.percentage}
                  icon={category.icon}
                  name={category.name}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categoryScores.map((category) => (
                <RadialGauge
                  key={category.name}
                  percentage={category.percentage}
                  icon={category.icon}
                  name={category.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Curated Resources */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📚</span>
          <h2 className="text-xl font-bold text-gray-900">Curated Resources for You</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">Based on your assessment, here are resources to help improve your weakest areas:</p>
        
        <div className="space-y-6">
          {curatedResources.map((resource) => (
            <div key={resource.category} className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b">
                <span className="text-xl">{resource.icon}</span>
                <h3 className="font-semibold text-gray-900">{resource.category}</h3>
                <span className="text-sm text-gray-500">({resource.percentage}%)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {resource.items.map((item: ResourceItem, idx: number) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 group-hover:text-emerald-600 text-sm">{item.title}</h4>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.type}</span>
                    </div>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}