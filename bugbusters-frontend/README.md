# Bug Busters - Entrepreneurial Hub

An AI-powered business assessment platform designed to help Jackson State University students evaluate their digital readiness and receive personalized business recommendations.

## Project Overview

Bug Busters is a senior project that empowers JSU students to strengthen their entrepreneurial skills by providing:
- Business readiness assessments
- AI-generated personalized recommendations
- Visual analytics with Chart.js
- Voice advice using Eleven Labs
- Real-time chat support with AI
- Progress tracking over time

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Styling
- **Chart.js** - Data visualization
- **React Chart.js 2** - React wrapper for Chart.js

### Backend & Services
- **Clerk** - Authentication and user management
- **Supabase** - PostgreSQL database with Row Level Security
- **OpenAI GPT-4** - AI recommendations and chat
- **Eleven Labs** - Text-to-speech for voice advice

### Deployment
- **Vercel** - Hosting and CI/CD

## Features

### 1. Business Assessment
- 10-question questionnaire covering key business areas
- Categories: Market Validation, Revenue Model, Customer Acquisition, Team Readiness, Operations
- Automated scoring and level determination (Low/Medium/High)

### 2. Visual Analytics
- **Bar Charts** - Category performance comparison
- **Radar Charts** - Multi-dimensional readiness view
- **Doughnut Charts** - Category distribution
- Interactive chart switching

### 3. Personalized Recommendations
- AI-generated advice based on assessment results
- Categorized by Quick Wins, Milestones, and Long-term Goals
- Curated resources for weakest areas

### 4. Voice Advice
- Text-to-speech conversion of recommendations
- Natural-sounding AI voice
- Playback controls

### 5. AI Chat Assistant
- 24/7 business advice
- Context-aware responses
- Focused on entrepreneurship and business growth

### 6. Progress Tracking
- Assessment history stored in database
- View past results and recommendations
- Track improvement over time

### 7. PDF Reports
- Downloadable business readiness reports
- Professional formatting
- Includes scores, recommendations, and resources

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Accounts for: Clerk, Supabase, OpenAI, Eleven Labs

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/bugbusters---SENIOR-PROJECT.git
   cd bugbusters---SENIOR-PROJECT/bugbusters-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Follow the `ENV_SETUP.md` guide to configure all services
   - Add your API keys

4. **Set up the database**
   - Create a Supabase project
   - Run the SQL schema from `src/database/schema.sql`
   - Verify Row Level Security policies are enabled

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
bugbusters-frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai-reccommendation/   # AI recommendation generation
│   │   │   ├── chat/                 # Chat with AI assistant
│   │   │   ├── generate-report/      # PDF report generation
│   │   │   └── voice-advice/         # Text-to-speech conversion
│   │   ├── components/
│   │   │   └── TopNavbar/            # Navigation component
│   │   ├── dashboard/
│   │   │   ├── business-support/     # Resources and support
│   │   │   ├── chat/                 # Chat interface
│   │   │   ├── questions/            # Assessment questionnaire
│   │   │   └── results/              # Results and analytics
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Landing page
│   ├── components/
│   │   ├── ChartVisualizations.tsx   # Chart.js components
│   │   └── VoiceAdvice.tsx           # Voice advice component
│   ├── database/
│   │   └── schema.sql                # Database schema
│   ├── hooks/
│   │   └── useAiRecommendtion.ts     # AI recommendation hook
│   ├── lib/
│   │   ├── database.ts               # Database utilities
│   │   ├── supabase.ts               # Supabase client
│   │   └── mock.ts                   # Mock data
│   ├── types/
│   │   └── index.ts                  # TypeScript types
│   └── middleware.ts                 # Clerk middleware
├── .env.example                      # Environment variables template
├── ENV_SETUP.md                      # Environment setup guide
├── DEPLOYMENT.md                     # Deployment guide
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
└── tailwind.config.ts                # Tailwind config
```

## Key Features Implementation

### Chart.js Integration
Located in `src/components/ChartVisualizations.tsx`:
- Bar chart for category comparison
- Radar chart for multi-dimensional view
- Doughnut chart for distribution
- Interactive chart switching

### Voice Advice (Eleven Labs)
Located in `src/components/VoiceAdvice.tsx` and `src/app/api/voice-advice/route.ts`:
- Converts recommendations to natural speech
- Streaming audio playback
- Error handling and loading states

### Database Integration (Supabase)
Located in `src/lib/database.ts`:
- Save assessment responses
- Store AI recommendations
- User profile management
- Row Level Security for data protection

### AI Chat (OpenAI)
Located in `src/app/api/chat/route.ts`:
- Context-aware business advice
- Streaming responses
- Error handling

## Environment Variables

See `ENV_SETUP.md` for detailed setup instructions.

Required variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `ELEVEN_LABS_API_KEY`
- `ELEVEN_LABS_VOICE_ID`

## Development

### Running Locally
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

Quick deploy to Vercel:
1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

## Team

**Bug Busters Senior Project Team:**
- SaNya Griffin
- Jaylon Nelson
- Kaniyah White
- Kaylen Bolden
- Marlvin Goremusandu
- Rita Osi

### Roles
- **Cybersecurity Lead**: Security and privacy implementation
- **Software Engineer Lead**: Architecture and code quality
- **Programming Lead**: AI integration and deployment
- **Database Lead**: Database design and management
- **Project Manager Lead**: Coordination and timeline management

## Research Focus

This project addresses key research questions:
1. How can AI-driven tools bridge the gap between classroom learning and workforce readiness?
2. What role can university-industry partnerships play in AI-driven learning platforms?
3. How can AI platforms help students find business development opportunities?
4. What barriers do JSU students face in business development and readiness?

## Security & Privacy

- **Authentication**: Clerk handles secure user authentication
- **Data Protection**: Row Level Security in Supabase
- **API Security**: All API routes require authentication
- **Environment Variables**: Secrets stored securely
- **HTTPS**: All production traffic encrypted
- **Input Validation**: All user inputs validated and sanitized

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of a senior project at Jackson State University.

## Acknowledgments

- Jackson State University
- EnRICH Program
- XLerateHealth
- University of Kentucky
- Interview participants: Adrianna Goss, Jessica Bohanna, Ahriel Pringle, Gabrielle Evans

## Support

For questions or issues:
- Create an issue in the GitHub repository
- Contact the team through Jackson State University

## Future Enhancements

- Mobile app (React Native)
- Advanced analytics dashboard
- Mentor matching system
- Peer collaboration features
- Integration with more business tools
- Multi-language support
- Enhanced AI recommendations with GPT-4 Turbo
