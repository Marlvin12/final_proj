"use client";

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import ThreeBackground from '@/components/ThreeBackground';
import { FileText, MessageSquare, BarChart3, Target, Check, Bot, TrendingUp, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || 'Entrepreneur';

  return (
    <>
      <ThreeBackground variant="gradient" />
      <div className="space-y-8 animate-fade-in relative">
        <div className="relative rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-down text-white">
              Welcome back, <span className="text-shadow-glow">{firstName}</span>!
            </h1>
            <p className="text-xl text-white/95 max-w-2xl animate-fade-in animation-delay-200">
              Ready to take your entrepreneurial journey to the next level? Choose from the options below to get started.
            </p>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/questions" className="group">
          <div className="glass-card rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/40 animate-fade-in perspective-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-20 w-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-glow">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                Start Assessment
              </h2>
            </div>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Answer curated questions to evaluate your business readiness and get personalized insights
            </p>
            <div className="flex items-center text-emerald-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
              Begin Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/chat" className="group">
          <div className="glass-card rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/40 animate-fade-in animation-delay-200 perspective-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-glow">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                AI Assistant
              </h2>
            </div>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Chat with our AI business advisor for instant guidance and personalized recommendations
            </p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
              Start Chatting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/results" className="group">
          <div className="glass-card rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/40 animate-fade-in animation-delay-400 perspective-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-20 w-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-glow">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                View Results
              </h2>
            </div>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Review your assessment results, scores, and get data-driven recommendations
            </p>
            <div className="flex items-center text-purple-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
              See Results
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/business-support" className="group">
          <div className="glass-card rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/40 animate-fade-in animation-delay-600 perspective-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-20 w-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-glow">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                Business Support
              </h2>
            </div>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Access resources, mentorship opportunities, and growth tools for your business
            </p>
            <div className="flex items-center text-orange-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
              Explore Resources
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-800">
        <div className="glass-card rounded-3xl p-6 border border-white/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
            <Check className="h-12 w-12 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">Comprehensive Analysis</h3>
          <p className="text-gray-600 leading-relaxed">Get detailed insights into all aspects of your business readiness</p>
        </div>
        
        <div className="glass-card rounded-3xl p-6 border border-white/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group animation-delay-200">
          <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
            <Bot className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">AI-Powered Guidance</h3>
          <p className="text-gray-600 leading-relaxed">Leverage cutting-edge AI for personalized recommendations</p>
        </div>
        
        <div className="glass-card rounded-3xl p-6 border border-white/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group animation-delay-400">
          <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="h-12 w-12 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Track Progress</h3>
          <p className="text-gray-600 leading-relaxed">Monitor your entrepreneurial journey and celebrate milestones</p>
        </div>
      </div>
    </div>
      </>
  );
}

