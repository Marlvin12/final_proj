export default function BusinessSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Business Support</h1>
        <p className="text-gray-600 mt-1">Access resources and guidance to grow your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Learning Resources</h3>
          <p className="text-sm text-gray-600 mb-4">
            Curated guides and tutorials to help you build your business
          </p>
          <button className="text-sm text-emerald-600 hover:underline font-medium">
            Browse Resources →
          </button>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Expert Consultation</h3>
          <p className="text-sm text-gray-600 mb-4">
            Connect with mentors and business advisors
          </p>
          <button className="text-sm text-emerald-600 hover:underline font-medium">
            Schedule a Call →
          </button>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Funding Opportunities</h3>
          <p className="text-sm text-gray-600 mb-4">
            Explore grants and investment options for your business
          </p>
          <button className="text-sm text-emerald-600 hover:underline font-medium">
            View Opportunities →
          </button>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Community Forum</h3>
          <p className="text-sm text-gray-600 mb-4">
            Connect with other entrepreneurs and share experiences
          </p>
          <button className="text-sm text-emerald-600 hover:underline font-medium">
            Join Discussion →
          </button>
        </div>
      </div>

      <div className="rounded-lg border bg-emerald-50 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Need Immediate Help?</h3>
        <p className="text-sm text-gray-700 mb-4">
          Our AI assistant is available 24/7 to answer your questions
        </p>
        <a
          href="/dashboard/chat"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Start Chat
        </a>
      </div>
    </div>
  );
}


