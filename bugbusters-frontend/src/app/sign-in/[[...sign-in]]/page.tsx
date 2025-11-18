"use client";

import { useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, GraduationCap } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<"clerk" | "jnumber">("clerk");
  const [jNumber, setJNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJNumberSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch("/api/auth/jnumber/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ j_number: jNumber, password }),
        credentials: "include",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        setError("Invalid response from server. Please try again.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        console.error("Sign-in failed:", data);
        setError(data.error || "Sign in failed");
        setLoading(false);
        return;
      }

      console.log("Sign-in successful, redirecting to dashboard...");
      // Use window.location for a full page reload to ensure cookies are processed
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Sign-in error:", err);
      if (err.name === 'AbortError') {
        setError("Request timed out. Please check your connection and try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  const handleJNumberSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch("/api/auth/jnumber/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          j_number: jNumber,
          password,
          full_name: fullName || null,
        }),
        credentials: "include",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        setError("Invalid response from server. Please try again.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        console.error("Sign-up failed:", data);
        setError(data.error || "Sign up failed");
        setLoading(false);
        return;
      }

      console.log("Sign-up successful, redirecting to dashboard...");
      // Use window.location for a full page reload to ensure cookies are processed
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Sign-up error:", err);
      if (err.name === 'AbortError') {
        setError("Request timed out. Please check your connection and try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
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
              {isSignUp ? "Create Account" : "Sign In"}
            </h1>
            <p className="text-gray-600">
              Choose your preferred authentication method
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => {
                setAuthMethod("clerk");
                setError("");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                authMethod === "clerk"
                  ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg"
                  : "glass text-gray-700 hover:bg-white/50"
              }`}
            >
              Clerk Authentication
            </button>
            <button
              onClick={() => {
                setAuthMethod("jnumber");
                setError("");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                authMethod === "jnumber"
                  ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg"
                  : "glass text-gray-700 hover:bg-white/50"
              }`}
            >
              <GraduationCap className="inline w-5 h-5 mr-2" />
              J# Authentication
            </button>
          </div>

          {authMethod === "clerk" ? (
            <div className="flex justify-center">
              <SignIn
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                afterSignInUrl="/dashboard"
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "shadow-none bg-transparent",
                  },
                }}
              />
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <form
                onSubmit={isSignUp ? handleJNumberSignUp : handleJNumberSignIn}
                className="space-y-4"
              >
                {isSignUp && (
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name (Optional)
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="jNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    J# <span className="text-gray-500">(e.g., J123456)</span>
                  </label>
                  <input
                    id="jNumber"
                    type="text"
                    value={jNumber}
                    onChange={(e) => setJNumber(e.target.value.toUpperCase())}
                    required
                    pattern="[Jj]\d+"
                    className="w-full px-4 py-3 rounded-xl glass border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    placeholder="J123456"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    placeholder="Enter your password"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Processing..."
                    : isSignUp
                    ? "Create Account"
                    : "Sign In"}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setError("");
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    {isSignUp
                      ? "Already have an account? Sign in"
                      : "Don't have an account? Sign up"}
                  </button>
                </div>
              </form>
            </div>
          )}

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

