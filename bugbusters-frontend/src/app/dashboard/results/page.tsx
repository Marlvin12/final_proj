"use client";

import React, { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function computeScore(params: URLSearchParams): { score: number; level: "low" | "medium" | "high" } {
  let total = 0;
  let count = 0;
  params.forEach((v, k) => {
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

export default function ResultsPage() {
  const params = useSearchParams();
  const router = useRouter();

  const { score, level } = useMemo(() => computeScore(params), [params]);
  const advice = useMemo(() => adviceFor(level), [level]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Assessment Results</h1>
          <p className="text-gray-600">Your current business readiness score and next steps.</p>
        </div>
        <button
          onClick={() => router.push("/dashboard/questions")}
          className="rounded-md border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-4 py-2 text-sm font-medium transition-colors"
        >
          Retake Questions
        </button>
      </div>

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
          <div className="text-sm text-gray-600 font-medium">Next Step</div>
          <div className="mt-2 text-gray-900 font-medium">{advice.title}</div>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">AI Guidance & Recommendations</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {advice.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


