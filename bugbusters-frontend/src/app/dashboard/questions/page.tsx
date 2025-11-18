"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { checkJNumberAuth } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

type Question = {
  id: string;
  label: string;
  type: "scale" | "boolean" | "text";
};

const QUESTIONS: Question[] = [
  { id: "market_validation", label: "Have you validated your target market?", type: "boolean" },
  { id: "value_prop_clarity", label: "Rate clarity of your value proposition (1-5)", type: "scale" },
  { id: "revenue_model", label: "Do you have a defined revenue model?", type: "boolean" },
  { id: "customer_acquisition", label: "Rate your customer acquisition strategy maturity (1-5)", type: "scale" },
  { id: "team_readiness", label: "Do you have the core team needed to execute?", type: "boolean" },
  { id: "runway_months", label: "Rate financial runway sufficiency (1-5)", type: "scale" },
  { id: "mvp_status", label: "Have you built an MVP?", type: "boolean" },
  { id: "traction", label: "Rate current traction (users/revenue) (1-5)", type: "scale" },
  { id: "ops_process", label: "Do you have basic ops/processes documented?", type: "boolean" },
  { id: "risk_mgmt", label: "Rate risk management readiness (1-5)", type: "scale" },
];

const STORAGE_KEY = 'assessment_answers';

export default function BusinessQuestionsPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {};
        }
      }
    }
    return {};
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user: clerkUser } = useUser();

  const allAnswered = useMemo(() => QUESTIONS.every((q) => answers[q.id]?.length), [answers]);

  const progress = useMemo(() => {
    const answered = Object.keys(answers).filter(key => answers[key]?.length > 0).length;
    return Math.round((answered / QUESTIONS.length) * 100);
  }, [answers]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!clerkUser) {
        await checkJNumberAuth();
      }
    };
    checkAuth();
  }, [clerkUser]);

  function onChange(id: string, value: string) {
    setAnswers((prev) => {
      const updated = { ...prev, [id]: value };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }

  function validate(): string | null {
    for (const q of QUESTIONS) {
      const v = answers[q.id];
      if (!v) return "Please answer all questions.";
      if (q.type === "scale") {
        const n = Number(v);
        if (!Number.isFinite(n) || n < 1 || n > 5) return "Scale answers must be between 1 and 5.";
      }
      if (q.type === "boolean" && v !== "yes" && v !== "no") return "Yes/No questions must be answered correctly.";
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setIsSubmitting(true);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    
    const params = new URLSearchParams(answers);
    router.push(`/dashboard/results?${params.toString()}`);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (allAnswered && !isSubmitting) {
        handleSubmit(e as React.FormEvent);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Business Assessment Questions</h1>
          <p className="text-white/90 text-lg mb-4">Answer all 10 questions to receive your personalized evaluation</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-white/80">{Object.keys(answers).filter(key => answers[key]?.length > 0).length} of {QUESTIONS.length} questions answered</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-5">
        {QUESTIONS.map((q, index) => {
          const isAnswered = answers[q.id]?.length > 0;
          return (
            <div 
              key={q.id}
              data-testid="question"
              className="group space-y-4 glass-card p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-emerald-300/50 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isAnswered 
                    ? 'bg-emerald-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                }`}>
                  {isAnswered ? '✓' : index + 1}
                </div>
                <label className="flex-1 block text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300" htmlFor={q.id}>
                  {q.label}
                </label>
              </div>
              {q.type === "boolean" ? (
                <div className="ml-11">
                  <select
                    id={q.id}
                    className="w-full max-w-md rounded-xl border-2 border-gray-200 px-5 py-3.5 text-gray-900 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-500 hover:border-emerald-300 hover:bg-white shadow-md hover:shadow-lg font-medium"
                    value={answers[q.id] ?? ""}
                    onChange={(e) => onChange(q.id, e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              ) : q.type === "scale" ? (
                <div className="ml-11 space-y-3">
                  <input
                    id={q.id}
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    className="w-full max-w-md h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
                    value={answers[q.id] || "3"}
                    onChange={(e) => onChange(q.id, e.target.value)}
                    required
                  />
                  <div className="flex justify-between max-w-md text-sm text-gray-600">
                    <span className={answers[q.id] === "1" ? "text-emerald-600 font-semibold" : ""}>1</span>
                    <span className={answers[q.id] === "2" ? "text-emerald-600 font-semibold" : ""}>2</span>
                    <span className={answers[q.id] === "3" ? "text-emerald-600 font-semibold" : ""}>3</span>
                    <span className={answers[q.id] === "4" ? "text-emerald-600 font-semibold" : ""}>4</span>
                    <span className={answers[q.id] === "5" ? "text-emerald-600 font-semibold" : ""}>5</span>
                  </div>
                  <div className="text-center max-w-md">
                  <span className="inline-block bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-800 px-6 py-3 rounded-xl font-bold text-xl shadow-md border border-emerald-200/50">
                    {answers[q.id] || "3"}
                  </span>
                  </div>
                </div>
              ) : (
                <div className="ml-11">
                  <input
                    id={q.id}
                    type="text"
                    className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 text-gray-900 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-500 hover:border-emerald-300 hover:bg-white shadow-md hover:shadow-lg font-medium"
                    value={answers[q.id] ?? ""}
                    onChange={(e) => onChange(q.id, e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
          );
        })}
        
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}
        
        <button
          type="submit"
          data-testid="submit-button"
          disabled={!allAnswered || isSubmitting}
          className="group relative w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 px-8 py-5 text-lg font-bold text-white shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.4)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 transform hover:scale-[1.01] hover:-translate-y-1.5 overflow-hidden disabled:hover:scale-100 disabled:hover:translate-y-0"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          <span className="relative flex items-center justify-center gap-3">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : allAnswered ? (
              <>
                Get Assessment
                <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            ) : (
              "Answer all questions to continue"
            )}
          </span>
        </button>
      </form>
    </div>
  );
}


