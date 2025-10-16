"use client";

import Link from "next/link";
import TopNavbar from "../components/TopNavbar/TopNavbar";
import ThreeBackground from "@/components/ThreeBackground";
import { Users, GraduationCap, MessageSquare, Link2, Package, Rocket, ArrowLeft, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <ThreeBackground variant="waves" />
      <TopNavbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),rgba(59,130,246,0.05),rgba(168,85,247,0.05))]"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-3xl animate-float animation-delay-2000"></div>
        
        <section className="relative px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16 animate-fade-in-down">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Get in Touch
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions or feedback? We&apos;d love to hear from you!
              </p>
            </div>

            <div className="space-y-8 animate-fade-in animation-delay-200">
              <div className="glass-card rounded-[2.5rem] p-8 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 perspective-card">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  Our Team
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  This project was created by students at Jackson State University as part of our senior project. 
                  Feel free to reach out to any team member:
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-emerald-400/40 hover:border-emerald-400 transition-all duration-300 hover:-translate-y-1">
                    <div className="h-14 w-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      K
                    </div>
                    <div>
                      <p className="font-bold text-emerald-900 text-lg">Kaniyah White</p>
                      <p className="text-sm text-emerald-700">Cybersecurity Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-blue-400/40 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1">
                    <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      M
                    </div>
                    <div>
                      <p className="font-bold text-blue-900 text-lg">Marlvin Goremusandu</p>
                      <p className="text-sm text-blue-700">Software Engineering Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-purple-400/40 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1">
                    <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      K
                    </div>
                    <div>
                      <p className="font-bold text-purple-900 text-lg">Kaylen Bolden</p>
                      <p className="text-sm text-purple-700">Database Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-orange-400/40 hover:border-orange-400 transition-all duration-300 hover:-translate-y-1">
                    <div className="h-14 w-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      J
                    </div>
                    <div>
                      <p className="font-bold text-orange-900 text-lg">Jaylon Nelson</p>
                      <p className="text-sm text-orange-700">Project Manager Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-pink-400/40 hover:border-pink-400 transition-all duration-300 hover:-translate-y-1">
                    <div className="h-14 w-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      S
                    </div>
                    <div>
                      <p className="font-bold text-pink-900 text-lg">Sa&apos;Nya Griffin</p>
                      <p className="text-sm text-pink-700">Programming Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-teal-400/40 hover:border-teal-400 transition-all duration-300 hover:-translate-y-1">
                    <div className="h-14 w-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      R
                    </div>
                    <div>
                      <p className="font-bold text-teal-900 text-lg">Rita Osi</p>
                      <p className="text-sm text-teal-700">UI/UX Design & Frontend Lead</p>
                    </div>
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
                  <p className="text-lg text-white/95 leading-relaxed mb-4 font-semibold">
                    Department of Computer Science
                  </p>
                  <p className="text-white/95 leading-relaxed">
                    This entrepreneurial hub platform was developed as a senior capstone project to demonstrate 
                    our technical skills and commitment to creating solutions that help entrepreneurs succeed.
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 perspective-card">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  Have Questions?
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  The best way to get help is to use our AI-powered chat assistant available in the dashboard. 
                  It can answer questions about business strategy, entrepreneurship, and how to use the platform.
                </p>
                <Link
                  href="/dashboard/chat"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 overflow-hidden animate-glow"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative">Chat with AI Assistant</span>
                  <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 shadow-xl border border-white/40">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                    <Link2 className="h-6 w-6 text-white" />
                  </div>
                  Project Resources
                </h2>
                <div className="space-y-4">
                  <a
                    href="https://github.com/Marlvin12/final_proj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/40 hover:border-emerald-400/50 transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors text-lg">View Source Code</p>
                      <p className="text-sm text-gray-600">Check out the project on GitHub</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/40 hover:border-blue-400/50 transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                      <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">Try the Platform</p>
                      <p className="text-sm text-gray-600">Start your entrepreneurial assessment</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </div>
              </div>

              <div className="text-center pt-8 animate-fade-in-up animation-delay-400">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 text-lg font-semibold text-gray-900 hover:text-emerald-600 transition-colors duration-300 group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

