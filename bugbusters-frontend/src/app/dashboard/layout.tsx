"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";
import Link from "next/link";
import { FileText, MessageSquare, BarChart3, Target, Home, Sparkles, Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Business Questions', href: '/dashboard/questions', icon: <FileText className="w-5 h-5" /> },
  { label: 'Assessment Results', href: '/dashboard/results', icon: <BarChart3 className="w-5 h-5" /> },
  { label: 'AI Chat', href: '/dashboard/chat', icon: <MessageSquare className="w-5 h-5" /> },
  { label: 'Business Support', href: '/dashboard/business-support', icon: <Target className="w-5 h-5" /> },
];

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
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-blue-50/30">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[280px] glass-card border-r border-white/20 shadow-xl">
            <div className="flex flex-col w-full h-full p-6 gap-8">
              {/* Logo */}
              <Link href="/dashboard" className="group flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative h-12 w-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Entrepreneurial
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Hub Dashboard</div>
                </div>
              </Link>

              {/* Navigation */}
              <nav className="flex flex-col gap-2 flex-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 group-hover:from-emerald-500/20 group-hover:to-blue-500/20 transition-all duration-300 group-hover:scale-110">
                        {item.icon}
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  </Link>
                ))}
                
                {/* Back to Home */}
                <Link
                  href="/"
                  className="mt-auto group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 transition-all duration-300 border-t border-white/20 pt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <Home className="w-5 h-5" />
                    <span className="text-sm">Back to Home</span>
                  </div>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
              <div className="fixed inset-y-0 left-0 w-full max-w-xs glass-card shadow-2xl border-r border-white/20">
                <div className="flex flex-col h-full p-6 gap-6">
                  <div className="flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                      <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        Entrepreneurial Hub
                      </span>
                    </Link>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <X className="w-6 h-6 text-gray-700" />
                    </button>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 glass-hover transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 group-hover:from-emerald-500/20 group-hover:to-blue-500/20 transition-all duration-300">
                          {item.icon}
                        </div>
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                    <Link
                      href="/"
                      className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 glass-hover transition-all duration-300 border-t border-white/20 pt-6"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Home className="w-5 h-5" />
                      <span className="text-sm">Back to Home</span>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col lg:pl-[280px] w-full">
            <header className="sticky top-0 z-40 glass border-b border-white/20 shadow-lg h-16 sm:h-18 flex items-center">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6 text-gray-700" />
                  </button>
                  <div className="hidden sm:block">
                    <div className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      Dashboard
                    </div>
                    <div className="text-xs text-gray-600">Welcome back!</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="glass px-4 py-2 rounded-xl border border-white/20">
                    <UserButton />
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto">
              <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">{children}</div>
            </main>
          </div>
          <ElevenLabsWidget />
        </div>
      </SignedIn>
    </>
  );
}


