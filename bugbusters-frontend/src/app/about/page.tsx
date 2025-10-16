"use client";

import Link from "next/link";
import TopNavbar from "../components/TopNavbar/TopNavbar";
import ThreeBackground from "@/components/ThreeBackground";
import { Target, Rocket, Users, GraduationCap, Wrench, Check, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <ThreeBackground variant="particles" />
      <TopNavbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),rgba(59,130,246,0.05),rgba(168,85,247,0.05))]"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl animate-float animation-delay-2000"></div>
        
        <section className="relative px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16 animate-fade-in-down">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  About Entrepreneurial Hub
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Empowering entrepreneurs with AI-powered business assessments and growth strategies
              </p>
            </div>

            <div className="space-y-8 animate-fade-in animation-delay-200">
              <div className="glass-card rounded-[2.5rem] p-8 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 perspective-card">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Entrepreneurial Hub is designed to help entrepreneurs at every stage of their journey. 
                  Whether you&apos;re just starting with an idea or scaling your business, our AI-powered platform 
                  provides personalized insights, recommendations, and resources to help you succeed.
                </p>
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 perspective-card">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  What We Offer
                </h2>
                <ul className="space-y-5 text-lg text-gray-700">
                  <li className="flex items-start gap-4 p-4 glass rounded-2xl border border-white/30 hover:border-emerald-400/50 transition-all duration-300">
                    <Check className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <span><strong className="text-gray-900">Business Assessments:</strong> Comprehensive evaluation of your business readiness across multiple categories</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 glass rounded-2xl border border-white/30 hover:border-blue-400/50 transition-all duration-300">
                    <Check className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <span><strong className="text-gray-900">AI-Powered Insights:</strong> Get personalized recommendations using GPT-4 technology</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 glass rounded-2xl border border-white/30 hover:border-purple-400/50 transition-all duration-300">
                    <Check className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                    <span><strong className="text-gray-900">Voice Guidance:</strong> Listen to your business advice with Eleven Labs voice technology</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 glass rounded-2xl border border-white/30 hover:border-emerald-400/50 transition-all duration-300">
                    <Check className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <span><strong className="text-gray-900">Data Visualizations:</strong> Interactive charts and graphs to track your progress</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 glass rounded-2xl border border-white/30 hover:border-blue-400/50 transition-all duration-300">
                    <Check className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <span><strong className="text-gray-900">Curated Resources:</strong> Access to handpicked resources tailored to your needs</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 glass rounded-2xl border border-white/30 hover:border-purple-400/50 transition-all duration-300">
                    <Check className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                    <span><strong className="text-gray-900">24/7 AI Assistant:</strong> Chat with our business advisor anytime</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 perspective-card">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  The Team
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  This project was developed as a senior project at Jackson State University by a talented team of students:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass p-5 rounded-2xl border border-emerald-400/40 hover:border-emerald-400 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-emerald-900 mb-1 text-lg">Kaniyah White</p>
                    <p className="text-sm text-emerald-700">Cybersecurity Lead</p>
                  </div>
                  <div className="glass p-5 rounded-2xl border border-blue-400/40 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-blue-900 mb-1 text-lg">Marlvin Goremusandu</p>
                    <p className="text-sm text-blue-700">Software Engineering Lead</p>
                  </div>
                  <div className="glass p-5 rounded-2xl border border-purple-400/40 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-purple-900 mb-1 text-lg">Kaylen Bolden</p>
                    <p className="text-sm text-purple-700">Database Lead</p>
                  </div>
                  <div className="glass p-5 rounded-2xl border border-orange-400/40 hover:border-orange-400 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-orange-900 mb-1 text-lg">Jaylon Nelson</p>
                    <p className="text-sm text-orange-700">Project Manager Lead</p>
                  </div>
                  <div className="glass p-5 rounded-2xl border border-pink-400/40 hover:border-pink-400 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-pink-900 mb-1 text-lg">Sa&apos;Nya Griffin</p>
                    <p className="text-sm text-pink-700">Programming Lead</p>
                  </div>
                  <div className="glass p-5 rounded-2xl border border-teal-400/40 hover:border-teal-400 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-teal-900 mb-1 text-lg">Rita Osi</p>
                    <p className="text-sm text-teal-700">UI/UX Design & Frontend Lead</p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-[2.5rem] p-8 text-white shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                    <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white/20">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    Jackson State University
                  </h2>
                  <p className="text-lg text-white/95 leading-relaxed">
                    This project represents the culmination of our studies and demonstrates our commitment to 
                    using technology to solve real-world problems. We&apos;re proud to be part of the Jackson State 
                    University community and grateful for the support of our professors and mentors.
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 shadow-xl border border-white/40">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600">
                    <Wrench className="h-6 w-6 text-white" />
                  </div>
                  Technology Stack
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  <div className="p-5 glass rounded-2xl border border-white/40 hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-gray-900 text-lg">Next.js</p>
                    <p className="text-sm text-gray-600">Frontend Framework</p>
                  </div>
                  <div className="p-5 glass rounded-2xl border border-white/40 hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-gray-900 text-lg">OpenAI GPT-4</p>
                    <p className="text-sm text-gray-600">AI Engine</p>
                  </div>
                  <div className="p-5 glass rounded-2xl border border-white/40 hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-gray-900 text-lg">Eleven Labs</p>
                    <p className="text-sm text-gray-600">Voice AI</p>
                  </div>
                  <div className="p-5 glass rounded-2xl border border-white/40 hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-gray-900 text-lg">Supabase</p>
                    <p className="text-sm text-gray-600">Database</p>
                  </div>
                  <div className="p-5 glass rounded-2xl border border-white/40 hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-gray-900 text-lg">Clerk</p>
                    <p className="text-sm text-gray-600">Authentication</p>
                  </div>
                  <div className="p-5 glass rounded-2xl border border-white/40 hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-bold text-gray-900 text-lg">Chart.js</p>
                    <p className="text-sm text-gray-600">Visualizations</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-8 animate-fade-in-up animation-delay-400">
                <Link
                  href="/dashboard"
                  className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-600 px-10 py-5 text-lg font-semibold text-white shadow-xl hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 overflow-hidden animate-glow"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative">Get Started Now</span>
                  <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

