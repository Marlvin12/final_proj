import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { saveQuestionnaireResponse, saveRecommendation } from '@/lib/database';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { score, level, categoryScores } = await req.json();

    // Construct the AI prompt
    const prompt = constructPrompt(score, level, categoryScores);

    // Call OpenAI API (you'll need to install openai package and set OPENAI_API_KEY)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert startup mentor and business advisor. Provide specific, actionable recommendations based on business assessment data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get AI recommendations');
    }

    const data = await response.json();
    const recommendations = data.choices[0].message.content;

    // Parse the recommendations into structured format
    const parsedRecommendations = parseRecommendations(recommendations);

    await storeRecommendations(userId, parsedRecommendations, score, level);

    return NextResponse.json({
      success: true,
      recommendations: parsedRecommendations,
      raw: recommendations
    });

  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    return NextResponse.json({ 
      error: 'Failed to generate recommendations',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

type CategoryScore = {
  name: string;
  percentage: number;
};

function constructPrompt(score: number, level: string, categoryScores: CategoryScore[]): string {
  const categoryBreakdown = categoryScores
    .map(cat => `- ${cat.name}: ${cat.percentage}%`)
    .join('\n');

  const weakestCategories = categoryScores
    .filter(cat => cat.percentage < 60)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3)
    .map(cat => cat.name)
    .join(', ');

  return `You are a startup mentor. Based on the following business assessment results, generate 4-5 specific, actionable recommendations. Focus on the weakest categories and provide concrete steps.

Assessment Results:
Overall Score: ${score}% (${level.toUpperCase()} readiness)
Next Stage: ${level === 'low' ? 'Foundational Focus' : level === 'medium' ? 'Execute and Measure' : 'Scale with Discipline'}

Category Breakdown:
${categoryBreakdown}

Weakest Areas: ${weakestCategories || 'All categories are strong'}

Instructions:
1. Provide 4-5 actionable recommendations
2. Each recommendation should be 1-2 sentences
3. Be specific and tie recommendations to the weakest categories
4. Focus on quick wins and practical steps
5. Number each recommendation

Format your response as a numbered list.`;
}

function parseRecommendations(text: string): string[] {
  // Parse numbered list from AI response
  const lines = text.split('\n').filter(line => line.trim());
  const recommendations: string[] = [];

  for (const line of lines) {
    // Match patterns like "1.", "1)", or numbered lines
    const match = line.match(/^\d+[\.)]\s*(.+)/);
    if (match) {
      recommendations.push(match[1].trim());
    } else if (line.trim() && !line.match(/^(Here|Based|I recommend)/i)) {
      // Capture lines that look like recommendations but aren't numbered
      recommendations.push(line.trim());
    }
  }

  return recommendations.slice(0, 5); // Return max 5 recommendations
}

async function storeRecommendations(
  userId: string,
  recommendations: string[],
  score: number,
  level: string
) {
  try {
    const stage: 'Idea' | 'Research' | 'Planning' | 'Launch' | 'Scaling' = 
      level === 'low' ? 'Idea' : 
      level === 'medium' ? 'Planning' : 'Scaling';

    const responseId = await saveQuestionnaireResponse(
      userId, 
      { level, timestamp: new Date().toISOString() }, 
      score, 
      stage
    );

    if (responseId) {
      for (const recommendation of recommendations) {
        await saveRecommendation(responseId, recommendation);
      }
    }
  } catch (error) {
    console.error('Error storing recommendations:', error);
  }
}