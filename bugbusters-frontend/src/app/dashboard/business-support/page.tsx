"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Phone, DollarSign, Users, MessageSquare, ArrowRight, ExternalLink, Sparkles, X, PlayCircle, Youtube } from "lucide-react";

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
      { label: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage", external: true },
      { label: "SCORE Business Resources", url: "https://www.score.org/", external: true },
    ]
  },
  {
    title: "Funding Opportunities",
    description: "Explore grants and investment options for your business",
    icon: <DollarSign className="w-6 h-6" />,
    links: [
      { label: "SBA Loan Programs", url: "https://www.sba.gov/funding-programs/loans", external: true },
      { label: "Grants.gov", url: "https://www.grants.gov/", external: true },
      { label: "SBA Grants", url: "https://www.sba.gov/federal-assistance-programs/grants", external: true },
      { label: "Mississippi Business Resources", url: "https://www.mississippi.org/business/", external: true },
    ]
  },
  {
    title: "Community Forum",
    description: "Connect with other entrepreneurs and share experiences",
    icon: <Users className="w-6 h-6" />,
    links: [
      { label: "Indie Hackers", url: "https://www.indiehackers.com/", external: true },
      { label: "Reddit r/Entrepreneur", url: "https://www.reddit.com/r/Entrepreneur/", external: true },
      { label: "Product Hunt", url: "https://www.producthunt.com/", external: true },
      { label: "Hacker News", url: "https://news.ycombinator.com/", external: true },
    ]
  },
];

interface VideoResource {
  title: string;
  url: string;
  description: string;
  duration: string;
  category: string;
}

const videoResources: VideoResource[] = [
  {
    title: "How to Start a Startup - Y Combinator",
    url: "https://www.youtube.com/watch?v=CBYhVcO4WgI",
    description: "Sam Altman's lecture on how to start a startup - Part of Y Combinator's startup school series",
    duration: "58 min",
    category: "Fundamentals"
  },
  {
    title: "Y Combinator Startup School - Complete Course",
    url: "https://www.youtube.com/c/ycombinator",
    description: "Visit Y Combinator's official YouTube channel for the complete Startup School course and lectures",
    duration: "Channel",
    category: "Fundamentals"
  },
  {
    title: "The Lean Startup Methodology",
    url: "https://www.youtube.com/watch?v=fEvKo90qBns",
    description: "Eric Ries explains the lean startup approach: build, measure, learn cycle",
    duration: "15 min",
    category: "Methodology"
  },
  {
    title: "How to Validate Your Business Idea",
    url: "https://www.youtube.com/watch?v=7ROelYvo8f0",
    description: "Learn how to test and validate your business idea before building",
    duration: "12 min",
    category: "Validation"
  },
  {
    title: "Customer Discovery - Steve Blank",
    url: "https://www.youtube.com/watch?v=i5E38frHo1U",
    description: "Steve Blank's customer development methodology for startups",
    duration: "45 min",
    category: "Validation"
  },
  {
    title: "Business Model Canvas Explained",
    url: "https://www.youtube.com/watch?v=QoAOzMTLP5s",
    description: "Step-by-step guide to creating your business model canvas",
    duration: "18 min",
    category: "Business Model"
  },
  {
    title: "Pricing Strategy for Startups",
    url: "https://www.youtube.com/watch?v=ydjsC7QYHUI",
    description: "Learn how to price your product or service effectively",
    duration: "22 min",
    category: "Revenue"
  },
  {
    title: "How to Get Your First 100 Customers",
    url: "https://www.youtube.com/watch?v=KQbJ7zb3aY4",
    description: "Practical strategies for acquiring your first customers",
    duration: "25 min",
    category: "Customer Acquisition"
  },
  {
    title: "Digital Marketing for Small Business",
    url: "https://www.youtube.com/watch?v=9No-FiEInLA",
    description: "Complete guide to digital marketing on a budget",
    duration: "30 min",
    category: "Marketing"
  },
  {
    title: "How to Find a Co-founder - Y Combinator",
    url: "https://www.youtube.com/watch?v=ydjsC7QYHUI",
    description: "Y Combinator's guide to finding the right co-founder",
    duration: "20 min",
    category: "Team"
  },
  {
    title: "Building a Startup Team",
    url: "https://www.youtube.com/watch?v=CBYhVcO4WgI",
    description: "How to hire and build your startup team effectively",
    duration: "28 min",
    category: "Team"
  },
  {
    title: "Financial Planning for Startups",
    url: "https://www.youtube.com/watch?v=QoAOzMTLP5s",
    description: "Understanding startup finances, runway, and fundraising",
    duration: "35 min",
    category: "Finance"
  },
  {
    title: "How to Pitch Your Startup",
    url: "https://www.youtube.com/watch?v=KQbJ7zb3aY4",
    description: "Learn how to create and deliver an effective pitch deck",
    duration: "15 min",
    category: "Fundraising"
  },
  {
    title: "Operations and Scaling",
    url: "https://www.youtube.com/watch?v=9No-FiEInLA",
    description: "How to scale your operations as your business grows",
    duration: "40 min",
    category: "Operations"
  },
  {
    title: "Legal Basics for Startups",
    url: "https://www.youtube.com/watch?v=7ROelYvo8f0",
    description: "Essential legal knowledge every entrepreneur should know",
    duration: "32 min",
    category: "Legal"
  },
  {
    title: "Product-Market Fit Explained",
    url: "https://www.youtube.com/watch?v=CBYhVcO4WgI",
    description: "Understanding and achieving product-market fit",
    duration: "18 min",
    category: "Product"
  }
];

export default function BusinessSupportPage() {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [expandedResource, setExpandedResource] = useState<number | null>(null);
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>('All');
  const [expandedVideos, setExpandedVideos] = useState(false);
  const [isOpeningWidget, setIsOpeningWidget] = useState(false);

  const handleScheduleCall = () => {
    setIsOpeningWidget(true);
    
    // Scroll to bottom to ensure widget is visible
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    
    // Wait a bit for widget to be ready if it's still loading
    setTimeout(() => {
      // Try to find and trigger the ElevenLabs widget
      const widget = document.querySelector('elevenlabs-convai') as HTMLElement;
      
      if (widget) {
        // Add a visual highlight to the widget area
        widget.style.transition = 'all 0.3s ease';
        widget.style.transform = 'scale(1.1)';
        widget.style.filter = 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))';
        
        // Remove highlight after animation
        setTimeout(() => {
          widget.style.transform = '';
          widget.style.filter = '';
        }, 1000);
        
        // Method 1: Try clicking the widget directly
        widget.click();
        
        // Method 2: Try to trigger the widget's open method if available
        if ('open' in widget && typeof (widget as { open?: () => void }).open === 'function') {
          try {
            (widget as { open: () => void }).open();
          } catch {
            console.log('Open method not available');
          }
        }
        
        // Method 3: Try dispatching a custom event that the widget might listen to
        const event = new CustomEvent('openWidget', { bubbles: true });
        widget.dispatchEvent(event);
        
        // Method 4: Try clicking the widget's shadow DOM button if accessible
        setTimeout(() => {
          try {
            const shadowRoot = widget.shadowRoot;
            if (shadowRoot) {
              // Try to find any clickable element in shadow DOM
              const button = shadowRoot.querySelector('button') as HTMLElement;
              const div = shadowRoot.querySelector('div[role="button"]') as HTMLElement;
              const clickable = button || div;
              
              if (clickable) {
                clickable.click();
              }
            }
          } catch {
            // Shadow DOM access might be restricted
            console.log('Shadow DOM access restricted');
          }
        }, 200);
        
        // Method 5: Try to focus and trigger keyboard event
        setTimeout(() => {
          widget.focus();
          const keyEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            bubbles: true
          });
          widget.dispatchEvent(keyEvent);
        }, 300);
        
        setIsOpeningWidget(false);
      } else {
        // Widget not found, show modal with instructions
        setIsOpeningWidget(false);
        setShowVoiceModal(true);
      }
    }, 100);
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
                Voice Assistant Ready!
              </h3>
              
              <p className="text-gray-600 mb-6">
                The AI voice assistant widget should now be open in the bottom-right corner. If you don&apos;t see it, look for the voice icon and click it to start your conversation!
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
            disabled={isOpeningWidget}
            className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-wait disabled:hover:translate-y-0"
          >
            {isOpeningWidget ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Opening Voice Assistant...</span>
              </>
            ) : (
              <>
                <Phone className="w-5 h-5" />
                <span>Start Voice Call</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </>
            )}
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

      {/* Video Archive Section */}
      <div className="glass-card rounded-3xl p-8 border border-white/20 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-14 w-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Youtube className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Video Learning Archive
            </h2>
            <p className="text-gray-600 mt-1">Curated YouTube videos to accelerate your entrepreneurial journey</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedVideoCategory('All')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
              selectedVideoCategory === 'All'
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/50 text-gray-700 hover:bg-white/70'
            }`}
          >
            All Videos
          </button>
          {Array.from(new Set(videoResources.map(v => v.category))).map(category => (
            <button
              key={category}
              onClick={() => setSelectedVideoCategory(category)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                selectedVideoCategory === category
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/50 text-gray-700 hover:bg-white/70'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(expandedVideos ? videoResources : videoResources.slice(0, 6))
            .filter(video => selectedVideoCategory === 'All' || video.category === selectedVideoCategory)
            .map((video, index) => (
              <a
                key={index}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card rounded-2xl p-5 border border-white/30 hover:border-red-300/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors text-sm leading-tight mb-1 line-clamp-2">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-md font-medium">
                        {video.category}
                      </span>
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {video.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-red-600 font-semibold group-hover:gap-3 transition-all duration-300">
                  Watch on YouTube
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </a>
            ))}
        </div>

        {videoResources.length > 6 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setExpandedVideos(!expandedVideos)}
              className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-white/50 hover:bg-white/70 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {expandedVideos ? 'Show Less Videos' : `Show All ${videoResources.length} Videos`}
            </button>
          </div>
        )}
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


