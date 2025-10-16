"use client";

import React, { useState } from 'react';

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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate voice advice');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      
      const audio = new Audio(url);
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setError('Failed to play audio');
        setIsPlaying(false);
      };
      
      await audio.play();
    } catch (err) {
      console.error('Error generating voice advice:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate voice advice. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = async () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setError('Failed to play audio');
        setIsPlaying(false);
      };
      
      await audio.play();
    } else {
      await generateVoiceAdvice();
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 shadow-sm border border-purple-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Voice Advice (Powered by Eleven Labs)
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            Listen to your personalized business recommendations with natural AI voice.
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="text-sm text-amber-800 mb-2">
                <strong>Voice Feature Unavailable</strong>
              </div>
              <div className="text-xs text-amber-700">
                {error}
              </div>
              {error.includes('API key') && (
                <div className="mt-2 text-xs text-amber-600">
                  To enable this feature, get a free API key from{' '}
                  <a 
                    href="https://elevenlabs.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-amber-800"
                  >
                    elevenlabs.io
                  </a>
                </div>
              )}
            </div>
          )}

          <button
            onClick={playAudio}
            disabled={isLoading || isPlaying}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                Generating...
              </>
            ) : isPlaying ? (
              <>
                <svg className="h-5 w-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                Playing...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {audioUrl ? 'Play Again' : 'Generate Voice Advice'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

