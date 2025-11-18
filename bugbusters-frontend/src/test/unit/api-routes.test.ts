import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';

vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}));

describe('API Route Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPENAI_API_KEY = 'test-api-key';
    process.env.ELEVEN_LABS_API_KEY = 'test-eleven-labs-key';
    vi.resetModules();
  });

  describe('Chat API Route', () => {
    it('should require authentication', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: null });

      const { POST } = await import('@/app/api/chat/route');
      const req = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: 'test', type: 'business-chat' }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should validate message input', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 'user-123' });

      const { POST } = await import('@/app/api/chat/route');
      const req = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: '', type: 'business-chat' }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Message is required');
    });

    it('should handle missing OpenAI API key gracefully', async () => {
      const originalKey = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;
      vi.resetModules();
      
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 'user-123' });

      const { POST } = await import('@/app/api/chat/route');
      const req = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: 'test', type: 'business-chat' }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toContain('unavailable');

      process.env.OPENAI_API_KEY = originalKey;
      vi.resetModules();
    });
  });

  describe('AI Recommendation API Route', () => {
    it('should require authentication', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: null });

      const { POST } = await import('@/app/api/ai-reccommendation/route');
      const req = new NextRequest('http://localhost:3000/api/ai-reccommendation', {
        method: 'POST',
        body: JSON.stringify({
          score: 65,
          level: 'medium',
          categoryScores: [],
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should validate request body', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 'user-123' });

      const { POST } = await import('@/app/api/ai-reccommendation/route');
      const req = new NextRequest('http://localhost:3000/api/ai-reccommendation', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        text: async () => 'Error',
      });

      const response = await POST(req);

      expect(response.status).toBe(500);
    });
  });

  describe('Voice Advice API Route', () => {
    it('should require authentication', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: null });

      const { POST } = await import('@/app/api/voice-advice/route');
      const req = new NextRequest('http://localhost:3000/api/voice-advice', {
        method: 'POST',
        body: JSON.stringify({ text: 'test text' }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should validate text input', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 'user-123' });

      const { POST } = await import('@/app/api/voice-advice/route');
      const req = new NextRequest('http://localhost:3000/api/voice-advice', {
        method: 'POST',
        body: JSON.stringify({ text: '' }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Text is required');
    });

    it('should handle missing Eleven Labs API key', async () => {
      const originalKey = process.env.ELEVEN_LABS_API_KEY;
      delete process.env.ELEVEN_LABS_API_KEY;
      vi.resetModules();
      
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 'user-123' });

      const { POST } = await import('@/app/api/voice-advice/route');
      const req = new NextRequest('http://localhost:3000/api/voice-advice', {
        method: 'POST',
        body: JSON.stringify({ text: 'test text' }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.error).toContain('Eleven Labs API key');

      process.env.ELEVEN_LABS_API_KEY = originalKey;
      vi.resetModules();
    });
  });

  describe('Generate Report API Route', () => {
    it('should require authentication', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: null });

      const { POST } = await import('@/app/api/generate-report/route');
      const req = new NextRequest('http://localhost:3000/api/generate-report', {
        method: 'POST',
        body: JSON.stringify({
          score: 65,
          level: 'medium',
          categoryScores: [],
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should generate HTML report', async () => {
      (auth as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 'user-123' });

      const { POST } = await import('@/app/api/generate-report/route');
      const req = new NextRequest('http://localhost:3000/api/generate-report', {
        method: 'POST',
        body: JSON.stringify({
          score: 65,
          level: 'medium',
          categoryScores: [
            { name: 'Market Validation', icon: '', percentage: 70 },
          ],
          roadmap: {
            quickWin: 'Test quick win',
            nextMilestone: 'Test milestone',
            longTerm: 'Test long term',
          },
          strongest: 'Market Validation',
          weakest: 'Revenue Model',
        }),
      });

      const response = await POST(req);
      const text = await response.text();

      expect(response.status).toBe(200);
      expect(text).toContain('Business Readiness Assessment Report');
      expect(text).toContain('65%');
    });
  });
});

