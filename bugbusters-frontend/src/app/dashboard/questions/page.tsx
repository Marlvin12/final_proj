"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function BusinessQuestionsPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const allAnswered = useMemo(() => QUESTIONS.every((q) => answers[q.id]?.length), [answers]);

  const progress = useMemo(() => {
    const answered = Object.keys(answers).filter(key => answers[key]?.length > 0).length;
    return Math.round((answered / QUESTIONS.length) * 100);
  }, [answers]);

  function onChange(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
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
    const params = new URLSearchParams(answers);
    router.push(`/dashboard/results?${params.toString()}`);
  }

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

      <form onSubmit={handleSubmit} className="space-y-5">
        {QUESTIONS.map((q, index) => {
          const isAnswered = answers[q.id]?.length > 0;
          return (
            <div 
              key={q.id} 
              className="group space-y-3 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200 animate-scale-in"
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
                    className="w-full max-w-md rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 shadow-sm"
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
                    className="w-full max-w-md h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
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
                    <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-bold text-lg">
                      {answers[q.id] || "3"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="ml-11">
                  <input
                    id={q.id}
                    type="text"
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 shadow-sm"
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
          disabled={!allAnswered}
          className="group relative w-full rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center justify-center gap-2">
            {allAnswered ? (
              <>
                Get Assessment
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
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


