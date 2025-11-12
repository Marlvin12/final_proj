"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { ChartVisualizations } from "@/components/ChartVisualizations";
import { VoiceAdvice } from "@/components/VoiceAdvice";
import { saveQuestionnaireResponse, getUserQuestionnaireResponses, type QuestionnaireResponse } from "@/lib/database";
import jsPDF from 'jspdf';
import { Share2, Twitter, Linkedin, Facebook, Image as ImageIcon, Check, Copy, History, Calendar, TrendingUp } from "lucide-react";

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
      icon: '',
      score: 0,
      maxScore: 0
    },
    'Revenue Model': {
      questions: ['revenue_model', 'runway_months'],
      icon: '',
      score: 0,
      maxScore: 0
    },
    'Customer Acquisition': {
      questions: ['customer_acquisition', 'mvp_status'],
      icon: '',
      score: 0,
      maxScore: 0
    },
    'Team Readiness': {
      questions: ['team_readiness'],
      icon: '',
      score: 0,
      maxScore: 0
    },
    'Operations & Processes': {
      questions: ['ops_process', 'risk_mgmt'],
      icon: '',
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
      { title: 'Y Combinator Startup School', url: 'https://www.startupschool.org/', description: 'Free online course covering market validation and startup fundamentals', type: 'Course' },
      { title: 'Value Proposition Canvas', url: 'https://www.strategyzer.com/canvas/value-proposition-canvas', description: 'Tool to design value propositions that customers want', type: 'Tool' },
      { title: 'The Mom Test Book', url: 'https://www.momtestbook.com/', description: 'How to talk to customers and learn if your business is a good idea', type: 'Book' },
      { title: 'Steve Blank Customer Development', url: 'https://steveblank.com/', description: 'Comprehensive resources on customer development and validation', type: 'Article' }
    ],
    'Revenue Model': [
      { title: 'SBA Business Plan Guide', url: 'https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan', description: 'Small Business Administration guide to financial planning and projections', type: 'Guide' },
      { title: 'Business Model Canvas', url: 'https://www.strategyzer.com/canvas/business-model-canvas', description: 'Strategic management template for developing business models', type: 'Tool' },
      { title: 'SCORE Financial Templates', url: 'https://www.score.org/resource/financial-projections-template', description: 'Free financial projection templates from SCORE mentors', type: 'Template' },
      { title: 'SBA Financial Planning', url: 'https://www.sba.gov/business-guide/plan-your-business/prepare-financial-statements', description: 'Guide to preparing financial statements and projections', type: 'Guide' }
    ],
    'Customer Acquisition': [
      { title: 'HubSpot Free CRM', url: 'https://www.hubspot.com/products/crm', description: 'Free customer relationship management software', type: 'Tool' },
      { title: 'Google Analytics Academy', url: 'https://analytics.google.com/analytics/academy/', description: 'Free courses on measuring and optimizing customer acquisition', type: 'Course' },
      { title: 'SBA Marketing Guide', url: 'https://www.sba.gov/business-guide/grow-your-business/market-research-competitive-analysis', description: 'Marketing and competitive analysis resources', type: 'Guide' },
      { title: 'Google Digital Garage', url: 'https://learndigital.withgoogle.com/digitalgarage', description: 'Free digital marketing courses and certifications', type: 'Course' }
    ],
    'Team Readiness': [
      { title: 'Y Combinator Co-founder Guide', url: 'https://www.ycombinator.com/library/8g-how-to-find-the-right-co-founder', description: 'Finding and working with co-founders effectively', type: 'Guide' },
      { title: 'SBA Hiring Guide', url: 'https://www.sba.gov/business-guide/manage-your-business/hire-manage-employees', description: 'Resources for hiring and managing employees', type: 'Guide' },
      { title: 'SCORE Business Mentors', url: 'https://www.score.org/', description: 'Free business mentoring and resources', type: 'Resource' },
      { title: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/', description: 'Professional development and team building courses', type: 'Course' }
    ],
    'Operations & Processes': [
      { title: 'SBA Operations Guide', url: 'https://www.sba.gov/business-guide/manage-your-business', description: 'Comprehensive guide to managing and scaling business operations', type: 'Guide' },
      { title: 'Notion Templates', url: 'https://www.notion.so/templates', description: 'Pre-built workspace templates for operations management', type: 'Tool' },
      { title: 'Google Workspace', url: 'https://workspace.google.com/', description: 'Productivity tools for business operations', type: 'Tool' },
      { title: 'SBA Legal Requirements', url: 'https://www.sba.gov/business-guide/launch-your-business/register-your-business', description: 'Legal requirements and business registration guide', type: 'Guide' }
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

const ProgressBar = ({ percentage, name }: { percentage: number; name: string }) => {
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

const RadialGauge = ({ percentage, name }: { percentage: number; name: string }) => {
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
          <span className="text-lg font-bold" style={{ color: getColor(percentage) }}>{percentage}%</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-gray-900">{name}</div>
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
  const [isSaving, setIsSaving] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [assessmentHistory, setAssessmentHistory] = useState<QuestionnaireResponse[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { score, level } = useMemo(() => computeScore(params), [params]);
  const { categoryScores, strongest, weakest } = useMemo(() => computeCategoryScores(params), [params]);
  const roadmap = useMemo(() => generateRoadmap(level, weakest), [level, weakest]);
  const curatedResources = useMemo(() => getCuratedResources(weakest, categoryScores), [weakest, categoryScores]);
  const advice = useMemo(() => adviceFor(level), [level]);
  const [viewMode, setViewMode] = useState<'bars' | 'radial'>('radial');

  const paramsString = useMemo(() => {
    const answers: Record<string, string> = {};
    params.forEach((value, key) => {
      answers[key] = value;
    });
    return new URLSearchParams(answers).toString();
  }, [params]);

  // Load assessment history when history tab is active
  useEffect(() => {
    const loadHistory = async () => {
      if (activeTab === 'history' && userId && assessmentHistory.length === 0 && !isLoadingHistory) {
        setIsLoadingHistory(true);
        try {
          const history = await getUserQuestionnaireResponses(userId);
          setAssessmentHistory(history);
        } catch (error) {
          console.error('Error loading assessment history:', error);
        } finally {
          setIsLoadingHistory(false);
        }
      }
    };
    loadHistory();
  }, [activeTab, userId, assessmentHistory.length, isLoadingHistory]);

  // Convert saved answers to URLSearchParams for viewing
  const loadAssessmentResults = (response: QuestionnaireResponse) => {
    const searchParams = new URLSearchParams();
    Object.entries(response.answers).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });
    router.push(`/dashboard/results?${searchParams.toString()}`);
    setActiveTab('current');
  };

  useEffect(() => {
    const saveAssessment = async () => {
      if (!userId || isSaved || isSaving) return;

      const answers: Record<string, string | number> = {};
      params.forEach((value, key) => {
        const numValue = Number(value);
        answers[key] = isNaN(numValue) ? value : numValue;
      });

      if (Object.keys(answers).length === 0) {
        return;
      }

      const saveKey = `assessment_saved_${userId}_${paramsString}`;

      if (typeof window !== 'undefined') {
        const alreadySaved = sessionStorage.getItem(saveKey);
        if (alreadySaved === 'true') {
          setIsSaved(true);
          return;
        }
      }

      setIsSaving(true);

      const stage: 'Idea' | 'Research' | 'Planning' | 'Launch' | 'Scaling' = 
        score < 30 ? 'Idea' : 
        score < 50 ? 'Research' : 
        score < 70 ? 'Planning' : 
        score < 85 ? 'Launch' : 'Scaling';

      try {
      const responseId = await saveQuestionnaireResponse(userId, answers, score, stage);
      if (responseId) {
        setIsSaved(true);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(saveKey, 'true');
          }
        }
      } catch (error) {
        console.error('Error saving assessment:', error);
      } finally {
        setIsSaving(false);
      }
    };

    saveAssessment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, paramsString, score, isSaved, isSaving]);

  const handleDownloadPDF = async () => {
    if (isGeneratingPDF) return;
    
    setIsGeneratingPDF(true);
    try {
      // Import jspdf-autotable as side effect to extend jsPDF prototype
      await import('jspdf-autotable');
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;

      doc.setFillColor(16, 185, 129);
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('Entrepreneurial Hub', pageWidth / 2, 15, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('Business Readiness Assessment Report', pageWidth / 2, 25, { align: 'center' });
      
      doc.setFontSize(10);
      doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), pageWidth / 2, 33, { align: 'center' });

      yPosition = 50;
      doc.setTextColor(0, 0, 0);

      doc.setFillColor(240, 253, 244);
      doc.roundedRect(15, yPosition, pageWidth - 30, 40, 3, 3, 'F');
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.roundedRect(15, yPosition, pageWidth - 30, 40, 3, 3, 'S');

      doc.setFontSize(16);
      doc.setTextColor(16, 185, 129);
      doc.text('Overall Readiness Score', pageWidth / 2, yPosition + 12, { align: 'center' });
      
      doc.setFontSize(36);
      doc.setFont('helvetica', 'bold');
      doc.text(`${score}%`, pageWidth / 2, yPosition + 28, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const levelText = level === 'high' ? 'Scaling Founder' : level === 'medium' ? 'Growing Entrepreneur' : 'Early Stage Innovator';
      doc.text(levelText, pageWidth / 2, yPosition + 36, { align: 'center' });

      yPosition = 100;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('Key Insight', 15, yPosition);
      
      yPosition += 8;
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const insightText = `Your strongest area is ${strongest.name} (${strongest.percentage}%), while ${weakest.name} (${weakest.percentage}%) needs the most attention. Focus on improving your weaker categories to build a well-rounded business foundation.`;
      const splitInsight = doc.splitTextToSize(insightText, pageWidth - 30);
      doc.text(splitInsight, 15, yPosition);

      yPosition += splitInsight.length * 6 + 10;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('Your Personalized Action Roadmap', 15, yPosition);
      
      yPosition += 10;

      const roadmapItems = [
        { title: 'Quick Win (This Week)', content: roadmap.quickWin, color: [16, 185, 129] },
        { title: 'Next Milestone (Next 3 Months)', content: roadmap.nextMilestone, color: [59, 130, 246] },
        { title: 'Long-Term Goal (6-12 Months)', content: roadmap.longTerm, color: [139, 92, 246] }
      ];

      roadmapItems.forEach((item) => {
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFillColor(item.color[0], item.color[1], item.color[2], 0.1);
        doc.rect(15, yPosition, 4, 20, 'F');
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(item.color[0], item.color[1], item.color[2]);
        doc.text(item.title, 22, yPosition + 6);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        const splitContent = doc.splitTextToSize(item.content, pageWidth - 35);
        doc.text(splitContent, 22, yPosition + 12);
        
        yPosition += Math.max(20, splitContent.length * 5 + 10);
      });

      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      yPosition += 10;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('Category Breakdown', 15, yPosition);
      
      yPosition += 8;

      const tableData = categoryScores.map(cat => [
        cat.name,
        `${cat.percentage}%`
      ]);

      // Type assertion for autoTable extension (jspdf-autotable extends jsPDF prototype)
      const docWithAutoTable = doc as jsPDF & {
        autoTable: (options: {
          startY?: number;
          head?: string[][];
          body?: string[][];
          theme?: string;
          headStyles?: Record<string, unknown>;
          styles?: Record<string, unknown>;
          alternateRowStyles?: Record<string, unknown>;
        }) => void;
        lastAutoTable?: {
          finalY: number;
        };
      };

      if (typeof docWithAutoTable.autoTable === 'function') {
        docWithAutoTable.autoTable({
        startY: yPosition,
        head: [['Category', 'Score']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [16, 185, 129],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5
        },
        alternateRowStyles: {
          fillColor: [249, 250, 251]
        }
      });
      } else {
        // Fallback: create table manually if autoTable is not available
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(16, 185, 129);
        doc.text('Category', 15, yPosition);
        doc.text('Score', pageWidth - 40, yPosition);
        yPosition += 8;
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        categoryScores.forEach((cat) => {
          doc.setFontSize(10);
          doc.text(cat.name, 15, yPosition);
          doc.text(`${cat.percentage}%`, pageWidth - 40, yPosition);
          yPosition += 7;
        });
      }

      const finalY = docWithAutoTable.lastAutoTable?.finalY ?? yPosition;
      yPosition = finalY + 15;

      // Add detailed category analysis
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('Detailed Category Analysis', 15, yPosition);
      yPosition += 10;

      // Category-specific recommendations
      const getCategoryRecommendation = (cat: CategoryScore) => {
        if (cat.percentage >= 80) {
          return `Excellent performance! Continue maintaining this strength and consider mentoring others in this area.`;
        } else if (cat.percentage >= 60) {
          return `Good foundation. Focus on refining processes and scaling this area to reach excellence.`;
        } else if (cat.percentage >= 40) {
          return `Needs improvement. Prioritize building core competencies in this area through targeted learning and practice.`;
        } else {
          return `Critical area requiring immediate attention. Start with foundational elements and seek mentorship or resources.`;
        }
      };

      categoryScores.forEach((cat) => {
        if (yPosition > pageHeight - 50) {
          doc.addPage();
          yPosition = 20;
        }

        // Category name and score (remove emoji icon for PDF compatibility)
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        const catColor = cat.percentage >= 80 ? [16, 185, 129] : cat.percentage >= 60 ? [59, 130, 246] : cat.percentage >= 40 ? [234, 179, 8] : [239, 68, 68];
        doc.setTextColor(catColor[0], catColor[1], catColor[2]);
        // Use category name without emoji for PDF
        doc.text(`${cat.name} - ${cat.percentage}%`, 15, yPosition);
        
        yPosition += 6;
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        const recommendation = getCategoryRecommendation(cat);
        const splitRec = doc.splitTextToSize(recommendation, pageWidth - 30);
        doc.text(splitRec, 20, yPosition);
        yPosition += splitRec.length * 4 + 8;
      });

      // Add Strengths & Weaknesses section
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      yPosition += 10;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('Strengths & Areas for Improvement', 15, yPosition);
      yPosition += 10;

      // Top 2 strengths
      const topStrengths = [...categoryScores].sort((a, b) => b.percentage - a.percentage).slice(0, 2);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('Top Strengths:', 15, yPosition);
      yPosition += 7;
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      topStrengths.forEach((strength, idx) => {
        const strengthText = `${idx + 1}. ${strength.name} (${strength.percentage}%) - ${strength.percentage >= 80 ? 'Excellent performance' : 'Strong foundation'}`;
        doc.text(strengthText, 20, yPosition);
        yPosition += 5;
      });

      yPosition += 5;
      // Bottom 2 weaknesses
      const topWeaknesses = [...categoryScores].sort((a, b) => a.percentage - b.percentage).slice(0, 2);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(239, 68, 68);
      doc.text('Areas Needing Attention:', 15, yPosition);
      yPosition += 7;
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      topWeaknesses.forEach((weakness, idx) => {
        const weaknessText = `${idx + 1}. ${weakness.name} (${weakness.percentage}%) - ${weakness.percentage < 40 ? 'Critical priority' : 'Needs improvement'}`;
        doc.text(weaknessText, 20, yPosition);
        yPosition += 5;
      });

      // Add Score Interpretation Guide
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = 20;
      }

      yPosition += 10;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('Understanding Your Scores', 15, yPosition);
      yPosition += 8;
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const interpretationText = [
        '80-100%: Excellent - You have strong capabilities in this area. Focus on maintaining and scaling.',
        '60-79%: Good - Solid foundation with room for growth. Refine processes and expand capabilities.',
        '40-59%: Needs Work - Basic understanding present. Prioritize learning and skill development.',
        '0-39%: Critical - Immediate attention required. Start with fundamentals and seek guidance.'
      ];
      interpretationText.forEach((text) => {
        doc.text(`• ${text}`, 20, yPosition);
        yPosition += 5;
      });

      // Add Personalized Recommendations
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      yPosition += 10;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('Personalized Recommendations', 15, yPosition);
      yPosition += 8;
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      advice.items.forEach((item, idx) => {
        const recText = `${idx + 1}. ${item}`;
        const splitRec = doc.splitTextToSize(recText, pageWidth - 35);
        doc.text(splitRec, 20, yPosition);
        yPosition += splitRec.length * 4 + 3;
      });

      // Add Next Steps section
      if (yPosition > pageHeight - 50) {
        doc.addPage();
        yPosition = 20;
      }

      yPosition += 10;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('Recommended Next Steps', 15, yPosition);
      yPosition += 8;
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      
      const nextSteps = [
        `1. Focus on ${weakest.name} - This is your lowest-scoring area and should be prioritized.`,
        `2. Leverage ${strongest.name} - Use your strength in this area to support other initiatives.`,
        `3. Follow your roadmap - Implement the Quick Win, Next Milestone, and Long-Term goals outlined above.`,
        `4. Track progress - Retake this assessment in 3 months to measure improvement.`,
        `5. Seek resources - Explore the curated resources available in your dashboard for each category.`
      ];

      nextSteps.forEach((step) => {
        const splitStep = doc.splitTextToSize(step, pageWidth - 35);
        doc.text(splitStep, 20, yPosition);
        yPosition += splitStep.length * 4 + 3;
      });

      // Add footer
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFillColor(16, 185, 129);
      doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('Entrepreneurial Hub - Jackson State University', pageWidth / 2, pageHeight - 15, { align: 'center' });
      doc.setFontSize(8);
      doc.text('Business Assessment Platform | Empowering entrepreneurs with AI-powered insights', pageWidth / 2, pageHeight - 8, { align: 'center' });

      const fileName = `business-readiness-report-${new Date().toISOString().split('T')[0]}-${score}percent.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Social sharing functions
  const shareableUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin;
    return `${baseUrl}/dashboard/results?${paramsString}`;
  }, [paramsString]);

  const shareText = useMemo(() => {
    const stage = level === 'high' ? 'Scaling Founder' : level === 'medium' ? 'Growing Entrepreneur' : 'Early Stage Innovator';
    return `I just completed my Business Readiness Assessment and scored ${score}%! I'm a ${stage}. Check out Entrepreneurial Hub!`;
  }, [score, level]);

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareableUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareableUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleExportImage = async () => {
    if (!resultsRef.current) return;
    
    setIsExportingImage(true);
    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#f9fafb',
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `business-readiness-${score}percent-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
      alert('Failed to export image. Please try again.');
    } finally {
      setIsExportingImage(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Business Readiness Assessment Results',
          text: shareText,
          url: shareableUrl,
        });
      } catch {
        // User cancelled or error occurred
        // Silently handle cancellation
      }
    } else {
      // Fallback to modal
      setShowShareModal(true);
    }
  };

  return (
    <div className="space-y-6" ref={resultsRef}>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/30 relative animate-slide-up">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-6">
              <div className="mx-auto h-16 w-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Share Your Results</h3>
              <p className="text-gray-600">Share your business readiness score with others!</p>
            </div>

            <div className="space-y-3 mb-6">
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between px-5 py-4 rounded-xl glass-hover border border-white/30 transition-all duration-300 hover:border-emerald-300/50 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                    {linkCopied ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Copy Link</div>
                    <div className="text-xs text-gray-500 truncate max-w-[200px]">{shareableUrl}</div>
                  </div>
                </div>
                {linkCopied && (
                  <span className="text-emerald-600 font-medium text-sm">Copied!</span>
                )}
              </button>

              {/* Social Media Buttons */}
              <button
                onClick={handleShareTwitter}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 transition-all duration-300 group"
              >
                <Twitter className="w-6 h-6 text-[#1DA1F2]" />
                <span className="font-semibold text-gray-900 flex-1 text-left">Share on Twitter</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={handleShareLinkedIn}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border border-[#0077B5]/30 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 text-[#0077B5]" />
                <span className="font-semibold text-gray-900 flex-1 text-left">Share on LinkedIn</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={handleShareFacebook}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 transition-all duration-300 group"
              >
                <Facebook className="w-6 h-6 text-[#1877F2]" />
                <span className="font-semibold text-gray-900 flex-1 text-left">Share on Facebook</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Export as Image */}
              <button
                onClick={handleExportImage}
                disabled={isExportingImage}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-xl glass-hover border border-white/30 transition-all duration-300 hover:border-emerald-300/50 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  {isExportingImage ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <ImageIcon className="w-5 h-5 text-white" />
                  )}
                </div>
                <span className="font-semibold text-gray-900 flex-1 text-left">
                  {isExportingImage ? 'Exporting...' : 'Export as Image'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Assessment Results</h1>
          <p className="text-gray-600">
            {activeTab === 'current' 
              ? 'Your current business readiness score and next steps.'
              : 'View all your past assessments and track your progress over time.'}
            {isSaving && (
              <span className="ml-2 text-emerald-600 font-medium">Saving...</span>
            )}
            {isSaved && (
              <span className="ml-2 text-emerald-600 font-medium">✓ Saved</span>
            )}
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 bg-white/50 rounded-xl p-1 border border-white/30">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              activeTab === 'current'
                ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-white/70'
            }`}
          >
            Current Results
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-white/70'
            }`}
          >
            <History className="w-4 h-4" />
            Assessment History
            {assessmentHistory.length > 0 && (
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {assessmentHistory.length}
              </span>
            )}
          </button>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="group rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 text-white hover:from-blue-600 hover:via-purple-600 px-8 py-3.5 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-70 disabled:cursor-wait flex items-center gap-3 hover:-translate-y-1 disabled:hover:translate-y-0"
            title="Download your assessment report as PDF"
          >
            {isGeneratingPDF ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Report</span>
              </>
            )}
          </button>
          <button
            onClick={handleNativeShare}
            className="group rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-pink-600 hover:to-purple-600 px-6 py-3.5 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center gap-2 hover:-translate-y-1"
            title="Share your results"
          >
            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Share</span>
          </button>
          <button
            onClick={() => router.push("/dashboard/questions")}
            className="rounded-xl border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 px-6 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
          >
            Retake Assessment
          </button>
        </div>
      </div>

      {/* Current Results Tab */}
      {activeTab === 'current' && (
        <>
      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl border border-white/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="text-sm text-gray-600 font-semibold mb-2">Readiness Score</div>
          <div className="text-5xl font-bold text-emerald-600 text-shadow-soft">{score}%</div>
        </div>
        <div className="glass-card rounded-2xl border border-white/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="text-sm text-gray-600 font-semibold mb-2">Level</div>
          <div className="text-3xl font-bold capitalize text-gray-900">{level}</div>
        </div>
        <div className="glass-card rounded-2xl border border-white/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="text-sm text-gray-600 font-semibold mb-2">Stage Badge</div>
          <div className="mt-3 inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200/50 shadow-md">
            {level === 'high' ? 'Scaling Founder' : level === 'medium' ? 'Growing Entrepreneur' : 'Early Stage Innovator'}
          </div>
        </div>
      </div>

      {/* Voice Advice */}
      <VoiceAdvice advice={advice.items} level={level} score={score} />

      {/* Personalized Action Roadmap */}
      <div className="glass-card rounded-2xl p-8 shadow-xl border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Your Personalized Action Roadmap</h2>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-wait shadow-md hover:shadow-lg"
            title="Download full report"
          >
            {isGeneratingPDF ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download</span>
              </>
            )}
          </button>
        </div>
        <div className="space-y-4">
          <div className="border-l-4 border-emerald-500 pl-4 py-2">
            <div className="text-sm font-semibold text-emerald-700 mb-1">Quick Win (This Week)</div>
            <p className="text-gray-700">{roadmap.quickWin}</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="text-sm font-semibold text-blue-700 mb-1">Next Milestone (Next 3 Months)</div>
            <p className="text-gray-700">{roadmap.nextMilestone}</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <div className="text-sm font-semibold text-purple-700 mb-1">Long-Term Goal (6-12 Months)</div>
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

        <div className="glass-card rounded-2xl p-8 shadow-xl border border-white/50">
          {viewMode === 'bars' ? (
            <div className="space-y-6">
              {categoryScores.map((category) => (
                <ProgressBar
                  key={category.name}
                  percentage={category.percentage}
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
                  name={category.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Curated Resources */}
      <div className="glass-card rounded-2xl p-8 shadow-xl border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📚</span>
          <h2 className="text-2xl font-bold text-gray-900">Curated Resources for You</h2>
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
        </>
      )}

      {/* Assessment History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {isLoadingHistory ? (
            <div className="glass-card rounded-2xl p-12 shadow-xl border border-white/50 text-center">
              <svg className="animate-spin h-8 w-8 text-emerald-600 mx-auto mb-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-gray-600">Loading your assessment history...</p>
            </div>
          ) : assessmentHistory.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 shadow-xl border border-white/50 text-center">
              <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Assessment History</h3>
              <p className="text-gray-600 mb-6">You haven&apos;t completed any assessments yet. Take your first assessment to see your results here!</p>
              <button
                onClick={() => router.push("/dashboard/questions")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Start Assessment
              </button>
            </div>
          ) : (
            <>
              <div className="glass-card rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Assessment History</h2>
                      <p className="text-sm text-gray-600">Track your progress over time</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">{assessmentHistory.length}</div>
                    <div className="text-xs text-gray-600">Total Assessments</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assessmentHistory.map((assessment, index) => {
                  const assessmentDate = assessment.created_at 
                    ? new Date(assessment.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : 'Unknown date';
                  
                  const assessmentLevel = assessment.score < 40 ? 'low' : assessment.score < 70 ? 'medium' : 'high';
                  const levelLabel = assessmentLevel === 'high' ? 'Scaling Founder' : assessmentLevel === 'medium' ? 'Growing Entrepreneur' : 'Early Stage Innovator';
                  
                  const isLatest = index === 0;
                  
                  return (
                    <div
                      key={assessment.id || index}
                      className={`glass-card rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 cursor-pointer group ${
                        isLatest ? 'ring-2 ring-emerald-500/50' : ''
                      }`}
                      onClick={() => loadAssessmentResults(assessment)}
                    >
                      {isLatest && (
                        <div className="absolute top-4 right-4 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                          Latest
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-600">{assessmentDate}</span>
                          </div>
                          <div className="text-3xl font-bold text-emerald-600 mb-1">{assessment.score}%</div>
                          <div className="text-sm font-semibold text-gray-700">{levelLabel}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">Stage</div>
                          <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                            {assessment.stage}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">View Details</span>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress Summary */}
              {assessmentHistory.length > 1 && (
                <div className="glass-card rounded-2xl p-6 shadow-xl border border-white/50">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">First Assessment</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {assessmentHistory[assessmentHistory.length - 1]?.score}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Latest Assessment</span>
                      <span className="text-sm font-semibold text-emerald-600">
                        {assessmentHistory[0]?.score}%
                      </span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900">Improvement</span>
                        <span className={`text-sm font-bold ${
                          (assessmentHistory[0]?.score || 0) > (assessmentHistory[assessmentHistory.length - 1]?.score || 0)
                            ? 'text-emerald-600'
                            : (assessmentHistory[0]?.score || 0) < (assessmentHistory[assessmentHistory.length - 1]?.score || 0)
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}>
                          {((assessmentHistory[0]?.score || 0) - (assessmentHistory[assessmentHistory.length - 1]?.score || 0)) > 0 ? '+' : ''}
                          {(assessmentHistory[0]?.score || 0) - (assessmentHistory[assessmentHistory.length - 1]?.score || 0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}