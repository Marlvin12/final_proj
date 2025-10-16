"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="flex min-h-screen bg-gray-50">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[260px] border-r bg-white shadow-sm">
            <div className="flex flex-col w-full h-full p-4 gap-6">
              <Link href="/dashboard" className="text-xl font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Entrepreneurial Hub
              </Link>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/dashboard/questions" className="rounded-lg px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors">
                  📝 Business Questions
                </Link>
                <Link href="/dashboard/results" className="rounded-lg px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors">
                  📊 Assessment Results
                </Link>
                <Link href="/dashboard/chat" className="rounded-lg px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors">
                  💬 AI Chat
                </Link>
                <Link href="/dashboard/business-support" className="rounded-lg px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors">
                  🎯 Business Support
                </Link>
                <Link href="/" className="rounded-lg px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors mt-4 border-t pt-4">
                  ← Back to Home
                </Link>
              </nav>
            </div>
          </aside>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-gray-900/50" onClick={() => setMobileMenuOpen(false)} />
              <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl">
                <div className="flex flex-col h-full p-6 gap-6">
                  <div className="flex items-center justify-between">
                    <Link href="/dashboard" className="text-xl font-semibold text-emerald-600" onClick={() => setMobileMenuOpen(false)}>
                      Entrepreneurial Hub
                    </Link>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                      <span className="text-2xl">×</span>
                    </button>
                  </div>
                  <nav className="flex flex-col gap-2 text-base">
                    <Link href="/dashboard/questions" className="rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      📝 Business Questions
                    </Link>
                    <Link href="/dashboard/results" className="rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      📊 Assessment Results
                    </Link>
                    <Link href="/dashboard/chat" className="rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      💬 AI Chat
                    </Link>
                    <Link href="/dashboard/business-support" className="rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      🎯 Business Support
                    </Link>
                    <Link href="/" className="rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors mt-4 border-t pt-4" onClick={() => setMobileMenuOpen(false)}>
                      ← Back to Home
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col lg:pl-[260px] w-full">
            <header className="sticky top-0 z-40 border-b bg-white shadow-sm h-14 sm:h-16 flex items-center">
              <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Open menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">Dashboard</div>
                </div>
                <UserButton />
              </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-gray-50">
              <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">{children}</div>
            </main>
          </div>
          <ElevenLabsWidget />
        </div>
      </SignedIn>
    </>
  );
}


