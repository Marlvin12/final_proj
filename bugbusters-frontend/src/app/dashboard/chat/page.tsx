"use client";

import { useState } from "react";
import ThreeBackground from "@/components/ThreeBackground";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your business AI assistant. What would you like help with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          type: "business-chat",
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble responding right now. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ThreeBackground variant="waves" />
      <div className="space-y-6 animate-fade-in relative">
        <div className="glass-card rounded-[3rem] border border-white/30 min-h-[700px] flex flex-col shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="relative p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-blue-600/10 to-purple-600/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex items-center gap-4">
              <div className="h-16 w-16 glass rounded-3xl flex items-center justify-center border border-white/40 shadow-lg animate-glow">
                <svg
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Business Assistant
                </h2>
                <p className="text-gray-600 text-lg">
                  Get instant help and recommendations
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              <div className={`flex gap-4 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg text-sm border-2 ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-400" 
                    : "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400"
                }`}>
                  {msg.role === "user" ? "You" : "AI"}
                </div>
                <div
                  className={`rounded-3xl px-6 py-4 text-base leading-relaxed shadow-lg hover:shadow-xl transition-all duration-300 ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
                      : "glass-card border border-white/40 text-gray-800"
                  }`}
                >
                  {msg.content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-2 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex gap-4 max-w-[80%]">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg text-sm border-2 border-blue-400">
                  AI
                </div>
                <div className="glass-card border border-white/40 text-gray-800 rounded-3xl px-6 py-4 shadow-lg">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
          <div className="relative flex gap-3">
            <div className="flex-1 glass-card rounded-3xl border border-white/40 shadow-lg overflow-hidden">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your business..."
                className="w-full px-6 py-4 text-base text-gray-900 bg-transparent placeholder-gray-500 focus:outline-none"
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSend()
                }
              />
            </div>
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="group glass-card border border-white/40 rounded-3xl h-14 w-14 flex items-center justify-center disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 disabled:hover:scale-100 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="h-6 w-6 text-emerald-600 group-hover:text-white relative z-10 group-hover:rotate-45 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </div>
    </div>
      </>
  );
}


