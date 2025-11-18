"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/30">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="relative h-12 w-12 bg-gradient-to-br from-emerald-500 via-emerald-600 to-blue-500 rounded-xl flex items-center justify-center shadow-xl">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Entrepreneurial Hub
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 mb-4">
              Sign up with Clerk or use J# authentication
            </p>
            <Link
              href="/sign-in"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Already have an account? Sign in →
            </Link>
          </div>

          <div className="flex justify-center">
            <SignUp
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-none bg-transparent",
                },
              }}
            />
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

