"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Radar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type CategoryScore = {
  name: string;
  icon: string;
  percentage: number;
  score: number;
  maxScore: number;
};

type ChartVisualizationsProps = {
  categoryScores: CategoryScore[];
  overallScore: number;
};

export function BarChart({ categoryScores }: { categoryScores: CategoryScore[] }) {
  const data = {
    labels: categoryScores.map(cat => cat.name),
    datasets: [
      {
        label: 'Category Performance (%)',
        data: categoryScores.map(cat => cat.percentage),
        backgroundColor: categoryScores.map(cat => {
          if (cat.percentage >= 80) return 'rgba(16, 185, 129, 0.8)';
          if (cat.percentage >= 60) return 'rgba(59, 130, 246, 0.8)';
          if (cat.percentage >= 40) return 'rgba(234, 179, 8, 0.8)';
          return 'rgba(239, 68, 68, 0.8)';
        }),
        borderColor: categoryScores.map(cat => {
          if (cat.percentage >= 80) return 'rgb(16, 185, 129)';
          if (cat.percentage >= 60) return 'rgb(59, 130, 246)';
          if (cat.percentage >= 40) return 'rgb(234, 179, 8)';
          return 'rgb(239, 68, 68)';
        }),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Business Readiness by Category',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        color: '#111827',
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function(context: any) {
            return `Score: ${context.parsed.y ?? 0}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function(value: any) {
            return value + '%';
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
}

export function RadarChart({ categoryScores }: { categoryScores: CategoryScore[] }) {
  const data = {
    labels: categoryScores.map(cat => cat.name),
    datasets: [
      {
        label: 'Your Business Readiness',
        data: categoryScores.map(cat => cat.percentage),
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(16, 185, 129)',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Readiness Radar',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        color: '#111827',
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          font: {
            size: 12,
          },
          color: '#374151',
        },
        ticks: {
          beginAtZero: true,
          max: 100,
          stepSize: 20,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function(value: any) {
            return value + '%';
          },
          backdropColor: 'transparent',
        },
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Radar data={data} options={options} />
    </div>
  );
}

export function DoughnutChart({ categoryScores }: ChartVisualizationsProps) {
  const excellentCount = categoryScores.filter(c => c.percentage >= 80).length;
  const goodCount = categoryScores.filter(c => c.percentage >= 60 && c.percentage < 80).length;
  const needsWorkCount = categoryScores.filter(c => c.percentage >= 40 && c.percentage < 60).length;
  const criticalCount = categoryScores.filter(c => c.percentage < 40).length;

  const data = {
    labels: ['Excellent (80%+)', 'Good (60-79%)', 'Needs Work (40-59%)', 'Critical (<40%)'],
    datasets: [
      {
        data: [excellentCount, goodCount, needsWorkCount, criticalCount],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Category Distribution',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        color: '#111827',
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = categoryScores.length;
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} categories (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export function ChartVisualizations({ categoryScores, overallScore }: ChartVisualizationsProps) {
  const [selectedChart, setSelectedChart] = React.useState<'bar' | 'radar' | 'doughnut'>('bar');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Visual Analytics</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedChart('bar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'bar'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setSelectedChart('radar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'radar'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            Radar Chart
          </button>
          <button
            onClick={() => setSelectedChart('doughnut')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'doughnut'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            Distribution
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        {selectedChart === 'bar' && <BarChart categoryScores={categoryScores} />}
        {selectedChart === 'radar' && <RadarChart categoryScores={categoryScores} />}
        {selectedChart === 'doughnut' && (
          <DoughnutChart categoryScores={categoryScores} overallScore={overallScore} />
        )}
      </div>
    </div>
  );
}

