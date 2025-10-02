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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Business Questions</h1>
        <p className="text-gray-600">Answer all 10 questions to get your assessment.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="space-y-2 bg-white p-4 rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-900" htmlFor={q.id}>
              {q.label}
            </label>
            {q.type === "boolean" ? (
              <select
                id={q.id}
                className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
            ) : q.type === "scale" ? (
              <input
                id={q.id}
                type="number"
                min={1}
                max={5}
                step={1}
                className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={answers[q.id] ?? ""}
                onChange={(e) => onChange(q.id, e.target.value)}
                required
              />
            ) : (
              <input
                id={q.id}
                type="text"
                className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={answers[q.id] ?? ""}
                onChange={(e) => onChange(q.id, e.target.value)}
                required
              />
            )}
          </div>
        ))}
        {error ? <p className="text-red-600 text-sm">{error}</p> : null}
        <button
          type="submit"
          disabled={!allAnswered}
          className="inline-flex items-center rounded-md bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Get Assessment
        </button>
      </form>
    </div>
  );
}


