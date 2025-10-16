"use client";

import Link from "next/link";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import ThreeBackground from "@/components/ThreeBackground";
import { GraduationCap, Sparkles, BarChart3, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <>
      <ThreeBackground variant="particles" />
      <TopNavbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),rgba(59,130,246,0.05),rgba(168,85,247,0.05))]"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full blur-3xl animate-float animation-delay-4000"></div>
        
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="glass-card rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5 group-hover:from-emerald-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="mb-6 sm:mb-8 animate-fade-in-down">
                <div className="inline-flex items-center glass rounded-full px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium text-emerald-900 mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-float border border-white/40">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Jackson State University Senior Project</span>
                  <span className="sm:hidden">JSU Senior Project</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight animate-fade-in-up px-2 mb-6">
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent text-shadow-glow">
                  Entrepreneurial Hub
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-6 animate-fade-in animation-delay-200">
                Business Assessment Platform
              </p>
              
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200 px-4">
                Evaluate your business&apos;s digital maturity with AI-powered assessments. Get personalized 
                recommendations, track your progress, and unlock resources to grow your entrepreneurial 
                venture with confidence.
              </p>
              
              <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 animate-fade-in animation-delay-400 px-4">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto group relative rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-600 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold text-white shadow-xl hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden text-center animate-glow"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative flex items-center justify-center gap-3">
                    Start Assessment
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto glass-card rounded-2xl px-8 py-4 text-base sm:text-lg font-semibold text-gray-900 hover:text-emerald-600 transition-all duration-300 group text-center shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center gap-2">
                    Learn more
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/30 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Comprehensive Entrepreneurial Assessment
              </span>
            </h2>
            <p className="text-lg sm:text-xl leading-8 text-gray-600">
              Our AI-powered platform evaluates multiple aspects of your entrepreneurial venture to provide 
              actionable insights and personalized growth strategies for success.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col group perspective-card glass-card hover:glass-hover p-8 rounded-3xl transition-all duration-500 border border-white/40 shadow-xl animate-fade-in">
                <dt className="flex items-center gap-x-3 text-lg font-bold leading-7 text-gray-900 mb-4">
                  <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg animate-glow">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <span className="group-hover:text-emerald-600 transition-colors duration-300">AI-Powered Questions</span>
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-relaxed text-gray-600">
                  <p className="flex-auto">
                    Get tailored questions specific to your industry and entrepreneurial venture, 
                    generated by advanced AI to assess your unique business situation and potential.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col group perspective-card glass-card hover:glass-hover p-8 rounded-3xl transition-all duration-500 border border-white/40 shadow-xl animate-fade-in animation-delay-200">
                <dt className="flex items-center gap-x-3 text-lg font-bold leading-7 text-gray-900 mb-4">
                  <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg animate-glow">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <span className="group-hover:text-blue-600 transition-colors duration-300">Smart Scoring System</span>
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-relaxed text-gray-600">
                  <p className="flex-auto">
                    Receive detailed scores on digital maturity, business readiness, and 
                    compliance with categorization into Beginner, Growing, or Established entrepreneur tiers.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col group perspective-card glass-card hover:glass-hover p-8 rounded-3xl transition-all duration-500 border border-white/40 shadow-xl animate-fade-in animation-delay-400">
                <dt className="flex items-center gap-x-3 text-lg font-bold leading-7 text-gray-900 mb-4">
                  <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg animate-glow">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <span className="group-hover:text-purple-600 transition-colors duration-300">Progress Tracking</span>
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-relaxed text-gray-600">
                  <p className="flex-auto">
                    Track your entrepreneurial development over time with stored results, 
                    exportable reports, and follow-up assessments to measure your business growth.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-lg sm:text-xl leading-8 text-gray-600">
              Simple steps to assess and improve your entrepreneurial venture
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4 relative">
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-400 via-blue-400 via-purple-400 to-orange-400 opacity-30"></div>
              
              <div className="text-center group relative glass-card p-6 rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold text-3xl mb-6 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 shadow-lg relative z-10 animate-glow">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">Sign Up</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create your account and enter your entrepreneurial venture information
                </p>
              </div>
              
              <div className="text-center group relative glass-card p-6 rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animation-delay-200">
                <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-3xl mb-6 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 shadow-lg relative z-10 animate-glow">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Assessment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Answer AI-generated questions tailored to your industry and business model
                </p>
              </div>
              
              <div className="text-center group relative glass-card p-6 rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animation-delay-400">
                <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-3xl mb-6 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 shadow-lg relative z-10 animate-glow">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get your entrepreneurial readiness score and personalized recommendations
                </p>
              </div>
              
              <div className="text-center group relative glass-card p-6 rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animation-delay-600">
                <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-3xl mb-6 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 shadow-lg relative z-10 animate-glow">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">Grow</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access resources, mentorship opportunities, and track your progress over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-4xl">
            <div className="glass-dark rounded-[3rem] p-12 lg:p-16 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 animate-fade-in-down">
                  Ready to Launch Your Entrepreneurial Journey?
                </h2>
                <p className="mt-6 text-lg sm:text-xl leading-8 text-white/90 animate-fade-in animation-delay-200 max-w-3xl mx-auto">
                  Join students and entrepreneurs who are using Entrepreneurial Hub to evaluate 
                  and improve their business strategies with AI-powered insights and expert guidance.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 animate-fade-in-up animation-delay-400">
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto group relative rounded-2xl bg-white px-10 py-5 text-lg font-semibold text-emerald-600 shadow-2xl hover:shadow-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative flex items-center justify-center gap-3">
                      Get Started Now
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto glass rounded-2xl px-10 py-5 text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300 group shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Contact Us
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-block glass-dark rounded-3xl px-8 py-4 mb-8 border border-white/10">
              <div className="text-white text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Entrepreneurial Hub
              </div>
            </div>
            <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
              Empowering entrepreneurs with AI-powered business assessments and growth strategies
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              <div className="glass-dark p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-emerald-400/30 group">
                <div className="font-semibold text-emerald-400 mb-1 group-hover:text-emerald-300 transition-colors">Cybersecurity Lead</div>
                <div className="text-gray-300 text-sm">Kaniyah White</div>
              </div>
              <div className="glass-dark p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-400/30 group">
                <div className="font-semibold text-blue-400 mb-1 group-hover:text-blue-300 transition-colors">Software Engineering Lead</div>
                <div className="text-gray-300 text-sm">Marlvin Goremusandu</div>
              </div>
              <div className="glass-dark p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-400/30 group">
                <div className="font-semibold text-purple-400 mb-1 group-hover:text-purple-300 transition-colors">Database Lead</div>
                <div className="text-gray-300 text-sm">Kaylen Bolden</div>
              </div>
              <div className="glass-dark p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-orange-400/30 group">
                <div className="font-semibold text-orange-400 mb-1 group-hover:text-orange-300 transition-colors">Project Manager Lead</div>
                <div className="text-gray-300 text-sm">Jaylon Nelson</div>
              </div>
              <div className="glass-dark p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-pink-400/30 group">
                <div className="font-semibold text-pink-400 mb-1 group-hover:text-pink-300 transition-colors">Programming Lead</div>
                <div className="text-gray-300 text-sm">Sa&apos;Nya Griffin</div>
              </div>
              <div className="glass-dark p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-teal-400/30 group">
                <div className="font-semibold text-teal-400 mb-1 group-hover:text-teal-300 transition-colors">UI/UX Design & Frontend Lead</div>
                <div className="text-gray-300 text-sm">Rita Osi</div>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
              <p>&copy; 2025 Entrepreneurial Hub - Jackson State University. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
