import Link from "next/link";
import TopNavbar from "../components/TopNavbar/TopNavbar";

export default function ContactPage() {
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
                  Get in Touch
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions or feedback? We'd love to hear from you!
              </p>
            </div>

            <div className="space-y-8 animate-fade-in animation-delay-200">
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">👥</span>
                  Our Team
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  This project was created by students at Jackson State University as part of our senior project. 
                  Feel free to reach out to any team member:
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                    <div className="h-12 w-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      K
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-900">Kaniyah White</p>
                      <p className="text-sm text-emerald-700">Cybersecurity Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      M
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Marlvin Goremusandu</p>
                      <p className="text-sm text-blue-700">Software Engineering Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      K
                    </div>
                    <div>
                      <p className="font-semibold text-purple-900">Kaylen Bolden</p>
                      <p className="text-sm text-purple-700">Database Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                    <div className="h-12 w-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      J
                    </div>
                    <div>
                      <p className="font-semibold text-orange-900">Jaylon Nelson</p>
                      <p className="text-sm text-orange-700">Project Manager Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200">
                    <div className="h-12 w-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      S
                    </div>
                    <div>
                      <p className="font-semibold text-pink-900">Sa&apos;Nya Griffin</p>
                      <p className="text-sm text-pink-700">Programming Lead</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎓</span>
                  Jackson State University
                </h2>
                <p className="text-lg text-white/90 leading-relaxed mb-4">
                  Department of Computer Science
                </p>
                <p className="text-white/90">
                  This entrepreneurial hub platform was developed as a senior capstone project to demonstrate 
                  our technical skills and commitment to creating solutions that help entrepreneurs succeed.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">💬</span>
                  Have Questions?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  The best way to get help is to use our AI-powered chat assistant available in the dashboard. 
                  It can answer questions about business strategy, entrepreneurship, and how to use the platform.
                </p>
                <Link
                  href="/dashboard/chat"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Chat with AI Assistant</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔗</span>
                  Project Resources
                </h2>
                <div className="space-y-3">
                  <a
                    href="https://github.com/Marlvin12/final_proj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 group"
                  >
                    <span className="text-2xl">📦</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">View Source Code</p>
                      <p className="text-sm text-gray-600">Check out the project on GitHub</p>
                    </div>
                    <span className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300">→</span>
                  </a>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 group"
                  >
                    <span className="text-2xl">🚀</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Try the Platform</p>
                      <p className="text-sm text-gray-600">Start your entrepreneurial assessment</p>
                    </div>
                    <span className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300">→</span>
                  </Link>
                </div>
              </div>

              <div className="text-center pt-8 animate-fade-in-up animation-delay-400">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-emerald-600 transition-colors duration-300 group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
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

