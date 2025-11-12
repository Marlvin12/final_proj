import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const ELEVEN_LABS_API_KEY = process.env.ELEVEN_LABS_API_KEY;
const ELEVEN_LABS_VOICE_ID = process.env.ELEVEN_LABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!ELEVEN_LABS_API_KEY) {
      return NextResponse.json(
        { 
          error: 'Voice advice feature requires Eleven Labs API key',
          message: 'Please add ELEVEN_LABS_API_KEY to your .env.local file'
        },
        { status: 503 }
      );
    }

    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_LABS_VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVEN_LABS_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      let errorMessage = 'Failed to generate voice';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail?.message || errorData.message || errorMessage;
        
        // Provide more specific error messages based on status
        if (response.status === 401) {
          errorMessage = 'Invalid Eleven Labs API key. Please check your configuration.';
        } else if (response.status === 429) {
          errorMessage = 'Rate limit exceeded. Please try again later.';
        } else if (response.status === 400) {
          errorMessage = 'Invalid request. Please check the text input.';
        }
      } catch {
        const errorText = await response.text();
        console.error('Eleven Labs API error:', errorText);
        if (response.status === 401) {
          errorMessage = 'Invalid Eleven Labs API key. Please check your configuration.';
        }
      }
      throw new Error(errorMessage);
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating voice advice:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate voice advice',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

