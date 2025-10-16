"use client";

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function DashboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || 'Entrepreneur';

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-down">
            Welcome back, {firstName}!
          </h1>
          <p className="text-xl text-white/90 max-w-2xl animate-fade-in animation-delay-200">
            Ready to take your entrepreneurial journey to the next level? Choose from the options below to get started.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/questions" className="group">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-emerald-300 animate-slide-in-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                📝
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                Start Assessment
              </h2>
            </div>
            <p className="text-gray-600 mb-4 text-lg">
              Answer curated questions to evaluate your business readiness and get personalized insights
            </p>
            <div className="flex items-center text-emerald-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
              Begin Now
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/chat" className="group">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-300 animate-slide-in-right">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                💬
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                AI Assistant
              </h2>
            </div>
            <p className="text-gray-600 mb-4 text-lg">
              Chat with our AI business advisor for instant guidance and personalized recommendations
            </p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
              Start Chatting
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/results" className="group">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-300 animate-slide-in-left animation-delay-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                📊
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                View Results
              </h2>
            </div>
            <p className="text-gray-600 mb-4 text-lg">
              Review your assessment results, scores, and get data-driven recommendations
            </p>
            <div className="flex items-center text-purple-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
              See Results
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/business-support" className="group">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-300 animate-slide-in-right animation-delay-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                🎯
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                Business Support
              </h2>
            </div>
            <p className="text-gray-600 mb-4 text-lg">
              Access resources, mentorship opportunities, and growth tools for your business
            </p>
            <div className="flex items-center text-orange-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
              Explore Resources
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-400">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
          <div className="text-emerald-600 text-4xl mb-3">✓</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Comprehensive Analysis</h3>
          <p className="text-gray-600">Get detailed insights into all aspects of your business readiness</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
          <div className="text-blue-600 text-4xl mb-3">🤖</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered Guidance</h3>
          <p className="text-gray-600">Leverage cutting-edge AI for personalized recommendations</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
          <div className="text-purple-600 text-4xl mb-3">📈</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Track Progress</h3>
          <p className="text-gray-600">Monitor your entrepreneurial journey and celebrate milestones</p>
        </div>
      </div>
    </div>
  );
}

