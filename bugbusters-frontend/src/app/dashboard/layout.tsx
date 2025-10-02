import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="flex min-h-screen bg-gray-50">
          <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[260px] border-r bg-white shadow-sm">
            <div className="flex flex-col w-full h-full p-4 gap-6">
              <div className="text-xl font-semibold text-emerald-600">Entrepreneurial Hub</div>
              <nav className="flex flex-col gap-2 text-sm">
                <a href="/dashboard/questions" className="rounded-lg px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors">Business Questions</a>
                <a href="/dashboard/results" className="rounded-lg px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors">Assessment Results</a>
                <a href="/dashboard/chat" className="rounded-lg px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors">Chat</a>
                <a href="/dashboard/business-support" className="rounded-lg px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors">Business Support</a>
              </nav>
            </div>
          </aside>
          <div className="flex-1 flex flex-col lg:pl-[260px] w-full">
            <header className="sticky top-0 z-40 border-b bg-white shadow-sm h-14 flex items-center">
              <div className="w-full max-w-6xl mx-auto px-6 flex items-center gap-4 justify-between">
                <div className="text-sm text-gray-600">Dashboard</div>
                <UserButton />
              </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-gray-50">
              <div className="w-full max-w-6xl mx-auto p-6 space-y-6">{children}</div>
            </main>
          </div>
        </div>
      </SignedIn>
    </>
  );
}


