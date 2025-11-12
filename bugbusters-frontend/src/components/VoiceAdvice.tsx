"use client";

import React, { useState, useRef, useEffect } from 'react';

type VoiceAdviceProps = {
  advice: string[];
  level: string;
  score: number;
};

export function VoiceAdvice({ advice, level, score }: VoiceAdviceProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateVoiceAdvice = async () => {
    setIsLoading(true);
    setError(null);

    const adviceText = `
      Hello! I'm your business advisor.
      Based on your assessment, you scored ${score} percent, which places you at a ${level} readiness level.
      Here are your personalized recommendations:
      ${advice.map((item, index) => `${index + 1}. ${item}`).join('. ')}
      Keep up the great work and focus on these areas to improve your business!
    `;

    try {
      const response = await fetch('/api/voice-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: adviceText }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to generate voice advice';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          
          // Provide more specific error messages
          if (response.status === 503) {
            errorMessage = 'Voice feature is not configured. Please contact support or check your API settings.';
          } else if (response.status === 401) {
            errorMessage = 'Authentication required. Please sign in to use voice features.';
          } else if (response.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          }
        } catch {
          // If response is not JSON, use status-based message
          if (response.status === 503) {
            errorMessage = 'Voice feature is not configured. Please contact support.';
          } else if (response.status === 401) {
            errorMessage = 'Authentication required. Please sign in.';
          }
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
      audio.onpause = () => setIsPlaying(false);
      audio.onerror = () => {
        setError('Failed to play audio');
        setIsPlaying(false);
        audioRef.current = null;
      };
      
      await audio.play();
    } catch (err) {
      console.error('Error generating voice advice:', err);
      let errorMessage = 'Failed to generate voice advice. Please try again.';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      // Provide user-friendly error messages
      if (errorMessage.includes('API key') || errorMessage.includes('not configured')) {
        errorMessage = 'Voice feature is not configured. This feature requires an Eleven Labs API key.';
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (errorMessage.includes('Unauthorized') || errorMessage.includes('401')) {
        errorMessage = 'Please sign in to use the voice advice feature.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = async () => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
      audio.onpause = () => setIsPlaying(false);
      audio.onerror = () => {
        setError('Failed to play audio');
        setIsPlaying(false);
        audioRef.current = null;
      };
      
      await audio.play();
    } else {
      await generateVoiceAdvice();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className="glass-card rounded-2xl p-8 shadow-xl border border-white/50 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900">
              Voice Advice
            </h3>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-md text-xs font-semibold">
              Powered by Eleven Labs
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Listen to your personalized business recommendations with natural AI voice. Get instant audio feedback on your assessment results.
          </p>
          
          {error && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-amber-800 mb-1">
                    Voice Feature Unavailable
                  </div>
                  <div className="text-xs text-amber-700 mb-2">
                    {error}
                  </div>
                  {(error.includes('API key') || error.includes('not configured') || error.includes('requires')) && (
                    <div className="mt-3 p-3 bg-white/50 rounded-lg border border-amber-200">
                      <div className="text-xs font-semibold text-amber-800 mb-2">How to Enable Voice Features:</div>
                      <ol className="text-xs text-amber-700 space-y-1 list-decimal list-inside">
                        <li>Get a free API key from{' '}
                          <a 
                            href="https://elevenlabs.io" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="underline hover:text-amber-900 font-medium"
                          >
                            elevenlabs.io
                          </a>
                        </li>
                        <li>Add <code className="bg-amber-100 px-1 rounded">ELEVEN_LABS_API_KEY</code> to your environment variables</li>
                        <li>Restart your development server</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 flex-wrap">
            {!isPlaying ? (
              <button
                onClick={playAudio}
                disabled={isLoading}
                className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Generating Voice...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>{audioUrl ? 'Play Again' : 'Generate Voice Advice'}</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={stopAudio}
                className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h12v12H6z" />
                </svg>
                <span>Stop</span>
              </button>
            )}
            
            {audioUrl && !isPlaying && !isLoading && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-emerald-600 font-medium">Ready to play</span>
              </div>
            )}
            
            {isPlaying && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-purple-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                <span className="text-purple-600 font-medium">Playing...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

