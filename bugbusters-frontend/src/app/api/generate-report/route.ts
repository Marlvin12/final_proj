// src/app/api/generate-report/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { score, level, categoryScores, roadmap, strongest, weakest, answers } = data;

    // Generate PDF content using a library like jsPDF or pdfmake
    // For now, we'll create a simple HTML-based PDF
    const htmlContent = generatePDFHTML(score, level, categoryScores, roadmap, strongest, weakest);

    // In production, you'd use a proper PDF generation service
    // For this example, we'll return HTML that can be converted to PDF client-side
    // or you can use libraries like 'puppeteer', 'pdfmake', or 'jspdf'
    
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="business-readiness-report.html"'
      }
    });

  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}

function generatePDFHTML(
  score: number,
  level: string,
  categoryScores: any[],
  roadmap: any,
  strongest: string,
  weakest: string
) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Business Readiness Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #10b981;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #10b981;
      margin-bottom: 10px;
    }
    .report-title {
      font-size: 24px;
      font-weight: bold;
      margin: 10px 0;
    }
    .date {
      color: #666;
      font-size: 14px;
    }
    .score-card {
      background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      margin: 30px 0;
    }
    .score-value {
      font-size: 60px;
      font-weight: bold;
      margin: 10px 0;
    }
    .section {
      margin: 30px 0;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #10b981;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
    }
    .category {
      margin: 20px 0;
      padding: 15px;
      background: #f9fafb;
      border-radius: 8px;
    }
    .category-name {
      font-weight: bold;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .progress-bar {
      height: 20px;
      background: #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: #10b981;
      transition: width 0.3s ease;
    }
    .roadmap-item {
      margin: 15px 0;
      padding: 15px;
      border-left: 4px solid #10b981;
      background: #f0fdf4;
    }
    .roadmap-title {
      font-weight: bold;
      color: #10b981;
      margin-bottom: 5px;
    }
    .insight-box {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 20px;
      margin: 20px 0;
    }
    .badge {
      display: inline-block;
      padding: 8px 16px;
      background: #10b981;
      color: white;
      border-radius: 20px;
      font-weight: bold;
      margin: 10px 0;
    }
    ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    li {
      margin: 8px 0;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    @media print {
      body {
        margin: 0;
        padding: 20px;
      }
      .score-card {
        break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Entrepreneurial Hub</div>
    <div class="report-title">Business Readiness Assessment Report</div>
    <div class="date">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>

  <div class="score-card">
    <div style="font-size: 18px; opacity: 0.9;">Your Overall Readiness Score</div>
    <div class="score-value">${score}%</div>
    <div class="badge">${level === 'high' ? ' Scaling Founder' : level === 'medium' ? 'Growing Entrepreneur' : ' Early Stage Innovator'}</div>
  </div>

  <div class="insight-box">
    <strong>💡 Key Insight:</strong> Your strongest area is <strong>${strongest}</strong>, 
    while <strong>${weakest}</strong> needs the most attention. Focus on improving your 
    weaker categories to build a well-rounded business foundation.
  </div>

  <div class="section">
    <div class="section-title"> Your Personalized Action Roadmap</div>
    
    <div class="roadmap-item" style="border-left-color: #10b981;">
      <div class="roadmap-title" style="color: #10b981;"> Quick Win (This Week)</div>
      <p>${roadmap.quickWin}</p>
    </div>
    
    <div class="roadmap-item" style="border-left-color: #3b82f6; background: #eff6ff;">
      <div class="roadmap-title" style="color: #3b82f6;"> Next Milestone (Next 3 Months)</div>
      <p>${roadmap.nextMilestone}</p>
    </div>
    
    <div class="roadmap-item" style="border-left-color: #8b5cf6; background: #f5f3ff;">
      <div class="roadmap-title" style="color: #8b5cf6;"> Long-Term Goal (6-12 Months)</div>
      <p>${roadmap.longTerm}</p>
    </div>
  </div>

  <div class="section">
    <div class="section-title">📊 Category Breakdown</div>
    ${categoryScores.map(cat => {
      const color = cat.percentage >= 80 ? '#10b981' : 
                   cat.percentage >= 60 ? '#3b82f6' : 
                   cat.percentage >= 40 ? '#eab308' : '#ef4444';
      return `
        <div class="category">
          <div class="category-name">
            <span>${cat.icon} ${cat.name}</span>
            <span style="color: ${color}; font-size: 18px;">${cat.percentage}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${cat.percentage}%; background: ${color};"></div>
          </div>
        </div>
      `;
    }).join('')}
  </div>

  <div class="section">
    <div class="section-title"> Recommended Next Steps</div>
    <ul>
      ${level === 'low' ? `
        <li>Validate your market via 5-10 customer interviews</li>
        <li>Draft a one-sentence value proposition and test with prospects</li>
        <li>Define a single revenue model hypothesis and run a small pilot</li>
        <li>Build an MVP with the smallest set of features to learn quickly</li>
      ` : level === 'medium' ? `
        <li>Tighten your acquisition channel: pick one channel and set weekly targets</li>
        <li>Formalize basic ops (onboarding, support) in a one-page playbook</li>
        <li>Track 2-3 metrics (activation rate, CAC, runway) in a simple dashboard</li>
        <li>Iterate on pricing with A/B experiments across 2 price points</li>
      ` : `
        <li>Systematize growth: automate your best-performing channel before adding new ones</li>
        <li>Strengthen the team with complementary skills and clear ownership</li>
        <li>Introduce quarterly goals (OKRs) tied to leading indicators</li>
        <li>De-risk dependencies via runbooks and periodic recovery drills</li>
      `}
    </ul>
  </div>

  <div class="section">
    <div class="section-title"> Recommended Resources</div>
    <p>Visit your dashboard to access curated resources tailored to your weakest categories, including:</p>
    <ul>
      <li>Customer Interview Guides and Templates</li>
      <li>Financial Planning Tools</li>
      <li>Marketing and Growth Frameworks</li>
      <li>Team Building Resources</li>
      <li>Operations and Process Templates</li>
    </ul>
    <p style="margin-top: 15px; padding: 15px; background: #f0fdf4; border-radius: 8px;">
      <strong> Pro Tip:</strong> Log back into your Entrepreneurial Hub dashboard to access 
      interactive tools, chat with our AI assistant, and track your progress over time.
    </p>
  </div>

  <div class="footer">
    <p><strong>Entrepreneurial Hub</strong> - Jackson State University</p>
    <p>Business Assessment Platform | Empowering entrepreneurs with AI-powered insights</p>
    <p style="margin-top: 10px;">This report is personalized based on your assessment responses. 
    For best results, retake the assessment quarterly to track your progress.</p>
  </div>
</body>
</html>
  `;
}