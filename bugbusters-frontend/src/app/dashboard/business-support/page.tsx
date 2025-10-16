"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Phone, DollarSign, Users, MessageSquare, ArrowRight, ExternalLink, Sparkles, X } from "lucide-react";

interface Resource {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: {
    label: string;
    url: string;
    external?: boolean;
  }[];
}

const resources: Resource[] = [
  {
    title: "Learning Resources",
    description: "Curated guides and tutorials to help you build your business",
    icon: <BookOpen className="w-6 h-6" />,
    links: [
      { label: "Startup School by Y Combinator", url: "https://www.startupschool.org/", external: true },
      { label: "SBA Learning Center", url: "https://www.sba.gov/learning-center-plan", external: true },
      { label: "Harvard Business Review", url: "https://hbr.org/topic/subject/entrepreneurship", external: true },
      { label: "Lean Startup Methodology", url: "http://theleanstartup.com/", external: true },
    ]
  },
  {
    title: "Funding Opportunities",
    description: "Explore grants and investment options for your business",
    icon: <DollarSign className="w-6 h-6" />,
    links: [
      { label: "SBA Loan Programs", url: "https://www.sba.gov/funding-programs/loans", external: true },
      { label: "Grants.gov", url: "https://www.grants.gov/", external: true },
      { label: "AngelList", url: "https://www.angellist.com/", external: true },
      { label: "Mississippi Small Business Grants", url: "https://www.mississippi.org/business/assistance/", external: true },
    ]
  },
  {
    title: "Community Forum",
    description: "Connect with other entrepreneurs and share experiences",
    icon: <Users className="w-6 h-6" />,
    links: [
      { label: "Indie Hackers", url: "https://www.indiehackers.com/", external: true },
      { label: "Reddit r/Entrepreneur", url: "https://www.reddit.com/r/Entrepreneur/", external: true },
      { label: "Startup Grind Community", url: "https://www.startupgrind.com/", external: true },
      { label: "Product Hunt", url: "https://www.producthunt.com/", external: true },
    ]
  },
];

export default function BusinessSupportPage() {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [expandedResource, setExpandedResource] = useState<number | null>(null);

  const handleScheduleCall = () => {
    setShowVoiceModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Voice Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
          <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 relative">
            <button
              onClick={() => setShowVoiceModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-float">
                <Phone className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Schedule a Voice Call
              </h3>
              
              <p className="text-gray-600 mb-6">
                Click the voice assistant icon in the bottom-right corner to speak with our AI advisor 24/7!
              </p>
              
              <div className="glass rounded-2xl p-6 mb-6 border border-emerald-400/40">
                <div className="flex items-center gap-3 text-emerald-700">
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium text-left">
                    Our AI voice assistant can help with business planning, market research, and strategic advice.
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setShowVoiceModal(false)}
                className="w-full px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="glass-card rounded-3xl p-8 border border-white/20 shadow-xl">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-14 w-14 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Business Support
            </h1>
            <p className="text-gray-600 mt-1">Access resources and guidance to grow your business</p>
          </div>
        </div>
      </div>

      {/* Expert Consultation Card */}
      <div className="glass-card rounded-3xl p-8 border border-white/20 shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Expert Consultation</h3>
              <p className="text-gray-600">Connect with our AI business advisor</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            Get instant answers to your business questions with our AI-powered voice assistant. 
            Available 24/7 to help with strategy, planning, and growth advice.
          </p>
          
          <button
            onClick={handleScheduleCall}
            className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <Phone className="w-5 h-5" />
            <span>Schedule a Call</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="glass-card rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                {resource.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {resource.description}
            </p>
            
            <div className="space-y-2">
              {resource.links.slice(0, expandedResource === index ? resource.links.length : 2).map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.url}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group/link flex items-center justify-between px-3 py-2 rounded-xl glass-hover transition-all duration-300 text-sm"
                >
                  <span className="text-gray-700 group-hover/link:text-emerald-600 transition-colors font-medium">
                    {link.label}
                  </span>
                  {link.external ? (
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover/link:text-emerald-600 transition-colors" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover/link:text-emerald-600 group-hover/link:translate-x-1 transition-all duration-300" />
                  )}
                </a>
              ))}
              
              {resource.links.length > 2 && (
                <button
                  onClick={() => setExpandedResource(expandedResource === index ? null : index)}
                  className="w-full text-sm text-emerald-600 hover:text-emerald-700 font-medium py-2 hover:bg-emerald-50/50 rounded-xl transition-colors"
                >
                  {expandedResource === index ? "Show less" : `Show ${resource.links.length - 2} more`}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI Chat CTA */}
      <div className="glass-card rounded-3xl p-8 border border-white/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-7 h-7 text-emerald-600" />
              <h3 className="text-2xl font-bold text-gray-900">Need Immediate Help?</h3>
            </div>
            <p className="text-gray-700">
              Our AI text assistant is available 24/7 to answer your questions about entrepreneurship, 
              business strategy, and growth tactics.
            </p>
          </div>
          
          <Link
            href="/dashboard/chat"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Start Chat</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}


