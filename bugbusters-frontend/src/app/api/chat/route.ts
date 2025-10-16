import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          reply: "I'm currently unavailable. To enable the AI chat feature, please add your OpenAI API key to the .env.local file. You can get a free API key from platform.openai.com."
        },
        { status: 200 }
      );
    }

    const { message, type } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    const systemPrompt = type === 'business-chat' 
      ? `You are a helpful business advisor for Jackson State University students. 
         Your role is to provide practical, actionable advice on entrepreneurship, business planning, 
         digital readiness, and business growth. Focus on helping students develop their businesses 
         by providing clear, specific guidance. Be encouraging and supportive while being realistic 
         about challenges. Keep responses concise but informative.`
      : 'You are a helpful assistant.';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat message',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

