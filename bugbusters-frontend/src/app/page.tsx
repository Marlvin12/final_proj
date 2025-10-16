import Link from "next/link";
import TopNavbar from "./components/TopNavbar/TopNavbar";

export default function Home() {
  return (
    <>
      <TopNavbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 sm:mb-8 animate-fade-in-down">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-emerald-800 mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-slow border border-emerald-200">
              <span className="mr-1 sm:mr-2 animate-pulse">🎓</span>
              <span className="hidden sm:inline">Jackson State University Senior Project</span>
              <span className="sm:hidden">JSU Senior Project</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 animate-fade-in-up px-2">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Entrepreneurial Hub
            </span>
            <br />
            <span className="text-gray-800 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Business Assessment Platform</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200 px-4">
            Evaluate your business&apos;s digital maturity with AI-powered assessments. Get personalized 
            recommendations, track your progress, and unlock resources to grow your entrepreneurial 
            venture with confidence.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 animate-fade-in animation-delay-400 px-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto group relative rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-xl hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden text-center"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center gap-2">
                Start Assessment
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto text-base sm:text-lg font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-all duration-300 group text-center"
            >
              Learn more 
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-blue-50/50"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Comprehensive Entrepreneurial Assessment
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Our AI-powered platform evaluates multiple aspects of your entrepreneurial venture to provide 
              actionable insights and personalized growth strategies for success.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col group hover:shadow-2xl hover:-translate-y-2 bg-white p-6 rounded-2xl transition-all duration-500 border-2 border-transparent hover:border-emerald-200 shadow-lg">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <span className="text-white font-bold text-xl">AI</span>
                  </div>
                  AI-Powered Questions
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Get tailored questions specific to your industry and entrepreneurial venture, 
                    generated by advanced AI to assess your unique business situation and potential.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col group hover:shadow-2xl hover:-translate-y-2 bg-white p-6 rounded-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-200 shadow-lg animation-delay-200">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <span className="text-white font-bold text-2xl">📊</span>
                  </div>
                  Smart Scoring System
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Receive detailed scores on digital maturity, business readiness, and 
                    compliance with categorization into Beginner, Growing, or Established entrepreneur tiers.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col group hover:shadow-2xl hover:-translate-y-2 bg-white p-6 rounded-2xl transition-all duration-500 border-2 border-transparent hover:border-purple-200 shadow-lg animation-delay-400">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <span className="text-white font-bold text-2xl">📈</span>
                  </div>
                  Progress Tracking
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
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

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Simple steps to assess and improve your entrepreneurial venture
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4 relative">
              <div className="hidden lg:block absolute top-8 left-1/4 right-1/4 h-1 bg-gradient-to-r from-emerald-300 via-blue-300 via-purple-300 to-orange-300"></div>
              
              <div className="text-center group relative">
                <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold text-2xl mb-6 group-hover:scale-125 group-hover:shadow-2xl transition-all duration-500 shadow-lg relative z-10">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">Sign Up</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Create your account and enter your entrepreneurial venture information
                </p>
              </div>
              
              <div className="text-center group relative">
                <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-2xl mb-6 group-hover:scale-125 group-hover:shadow-2xl transition-all duration-500 shadow-lg relative z-10">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Assessment</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Answer AI-generated questions tailored to your industry and business model
                </p>
              </div>
              
              <div className="text-center group relative">
                <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-2xl mb-6 group-hover:scale-125 group-hover:shadow-2xl transition-all duration-500 shadow-lg relative z-10">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">Results</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Get your entrepreneurial readiness score and personalized recommendations
                </p>
              </div>
              
              <div className="text-center group relative">
                <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-2xl mb-6 group-hover:scale-125 group-hover:shadow-2xl transition-all duration-500 shadow-lg relative z-10">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">Grow</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Access resources, mentorship opportunities, and track your progress over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6 animate-fade-in-down">
              Ready to Launch Your Entrepreneurial Journey?
            </h2>
            <p className="mt-6 text-xl leading-8 text-white/90 animate-fade-in animation-delay-200">
              Join students and entrepreneurs who are using Entrepreneurial Hub to evaluate 
              and improve their business strategies with AI-powered insights and expert guidance.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up animation-delay-400">
              <Link
                href="/dashboard"
                className="group relative rounded-xl bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-2xl hover:shadow-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  Get Started Now
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </Link>
              <Link
                href="/contact"
                className="text-lg font-semibold leading-6 text-white hover:text-white/80 transition-all duration-300 group"
              >
                Contact Us 
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="text-white text-xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Entrepreneurial Hub
            </div>
            <p className="text-gray-400 mb-6 text-lg">
              Empowering entrepreneurs with AI-powered business assessments and growth strategies
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-center text-sm text-gray-400 mb-8">
              <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <div className="font-semibold text-emerald-400">Cybersecurity Lead</div>
                <div>Kaniyah White</div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <div className="font-semibold text-blue-400">Software Engineering Lead</div>
                <div>Marlvin Goremusandu</div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <div className="font-semibold text-purple-400">Database Lead</div>
                <div>Kaylen Bolden</div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <div className="font-semibold text-orange-400">Project Manager Lead</div>
                <div>Jaylon Nelson</div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <div className="font-semibold text-pink-400">Programming Lead</div>
                <div>Sa&apos;Nya Griffin</div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
              <p>&copy; 2025 Entrepreneurial Hub - Jackson State University. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
