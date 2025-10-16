import Link from "next/link";
import TopNavbar from "../components/TopNavbar/TopNavbar";

export default function AboutPage() {
  return (
    <>
      <TopNavbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        
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
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The Entrepreneurial Hub is designed to help entrepreneurs at every stage of their journey. 
                  Whether you're just starting with an idea or scaling your business, our AI-powered platform 
                  provides personalized insights, recommendations, and resources to help you succeed.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🚀</span>
                  What We Offer
                </h2>
                <ul className="space-y-4 text-lg text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold mt-1">✓</span>
                    <span><strong>Business Assessments:</strong> Comprehensive evaluation of your business readiness across multiple categories</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold mt-1">✓</span>
                    <span><strong>AI-Powered Insights:</strong> Get personalized recommendations using GPT-4 technology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold mt-1">✓</span>
                    <span><strong>Voice Guidance:</strong> Listen to your business advice with Eleven Labs voice technology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold mt-1">✓</span>
                    <span><strong>Data Visualizations:</strong> Interactive charts and graphs to track your progress</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold mt-1">✓</span>
                    <span><strong>Curated Resources:</strong> Access to handpicked resources tailored to your needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold mt-1">✓</span>
                    <span><strong>24/7 AI Assistant:</strong> Chat with our business advisor anytime</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">👥</span>
                  The Team
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  This project was developed as a senior project at Jackson State University by a talented team of students:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                    <p className="font-semibold text-emerald-800 mb-1">Kaniyah White</p>
                    <p className="text-sm text-emerald-700">Cybersecurity Lead</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                    <p className="font-semibold text-blue-800 mb-1">Marlvin Goremusandu</p>
                    <p className="text-sm text-blue-700">Software Engineering Lead</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                    <p className="font-semibold text-purple-800 mb-1">Kaylen Bolden</p>
                    <p className="text-sm text-purple-700">Database Lead</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                    <p className="font-semibold text-orange-800 mb-1">Jaylon Nelson</p>
                    <p className="text-sm text-orange-700">Project Manager Lead</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200 md:col-span-2">
                    <p className="font-semibold text-pink-800 mb-1">Sa&apos;Nya Griffin</p>
                    <p className="text-sm text-pink-700">Programming Lead</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎓</span>
                  Jackson State University
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  This project represents the culmination of our studies and demonstrates our commitment to 
                  using technology to solve real-world problems. We're proud to be part of the Jackson State 
                  University community and grateful for the support of our professors and mentors.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🛠️</span>
                  Technology Stack
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors duration-300">
                    <p className="font-semibold text-gray-900">Next.js</p>
                    <p className="text-sm text-gray-600">Frontend Framework</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-300">
                    <p className="font-semibold text-gray-900">OpenAI GPT-4</p>
                    <p className="text-sm text-gray-600">AI Engine</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors duration-300">
                    <p className="font-semibold text-gray-900">Eleven Labs</p>
                    <p className="text-sm text-gray-600">Voice AI</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors duration-300">
                    <p className="font-semibold text-gray-900">Supabase</p>
                    <p className="text-sm text-gray-600">Database</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-300">
                    <p className="font-semibold text-gray-900">Clerk</p>
                    <p className="text-sm text-gray-600">Authentication</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors duration-300">
                    <p className="font-semibold text-gray-900">Chart.js</p>
                    <p className="text-sm text-gray-600">Visualizations</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-8 animate-fade-in-up animation-delay-400">
                <Link
                  href="/dashboard"
                  className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">Get Started Now</span>
                  <span className="relative group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

