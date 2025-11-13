# Elion Full-Stack Interview Project - Summary

## Project Overview

This is a complete full-stack interview coding challenge themed around Elion's AI-powered health tech intelligence platform. Candidates will build an AI research assistant that helps health IT leaders discover and analyze research papers.

**Time allocation:** 45 minutes  
**Focus:** Problem-solving and architectural thinking over speed

---

## What's Been Set Up

### ✅ Complete Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **UI Library:** shadcn/ui with Tailwind CSS (Button, Card, Input, Label, Table, Badge components)
- **Database:** PostgreSQL 16 in Docker
- **ORM:** MikroORM with migrations support
- **AI:** OpenAI SDK configured
- **Tooling:** Biome for linting/formatting, tsx for running TS scripts

### ✅ Database Infrastructure

**Example Entities (pre-built):**
- `User` - with email, name, role, timestamps
- `HealthSystem` - with name, location, bedCount, description, timestamps

**Migration System:**
- Initial migration created and applied
- MikroORM CLI configured with npm scripts
- TypeScript decorators properly configured

**Seed Data:**
- 4 sample users (CIOs, CMIOs, etc.)
- 5 sample health systems (MGH, Cleveland Clinic, Mayo, Johns Hopkins, UCSF)
- Easy to reset: `npm run db:seed`

### ✅ Example Implementation

**API Route:** `/api/health-systems`
- Shows proper MikroORM usage with `withORM` helper
- Error handling pattern
- NextResponse JSON formatting

**Frontend Page:** `/examples`
- Client component with React hooks
- Data fetching from API
- shadcn/ui components (Table, Card, Badge)
- Loading states

This gives candidates a reference for:
- Entity structure
- API route patterns
- Frontend data fetching
- UI component usage

### ✅ Documentation

**README.md** - Candidate-facing documentation:
- Complete setup instructions
- Project structure overview
- All npm scripts explained
- MikroORM patterns and examples
- OpenAI usage examples
- Troubleshooting guide

**INTERVIEWER_GUIDE.md** - Internal interview guide:
- 4 progressive task levels with increasing complexity
- Clear requirements vs ambiguous product challenges
- Expected time for each level
- Evaluation rubric (Technical 40%, Problem-Solving 40%, Communication 20%)
- Red flags and green flags to watch for
- Hints for common struggles
- Post-interview discussion topics

**SETUP_CHECKLIST.md** - Pre-interview preparation:
- Before interview checklist
- During interview checklist
- After interview cleanup
- Troubleshooting common issues

---

## Interview Task Progression

### Level 1: Basic CRUD (10-12 min)
- Create `Paper` entity
- Build API endpoint
- Display papers list
- **Ambiguous:** How to design for quick scanning?

### Level 2: AI Summaries (12-15 min)
- Add AI summarization with OpenAI
- Handle async operations
- **Ambiguous:** When to generate summaries? How to handle errors/delays?

### Level 3: Topic Collections (15-18 min)
- Many-to-many relationships
- Topic tagging system
- **Ambiguous:** Manual tagging vs AI auto-tagging? Trade-offs?

### Level 4: Recommendations (Optional)
- Open-ended system design
- **Ambiguous:** How to recommend related papers?

---

## Key Files

```
├── app/
│   ├── page.tsx                    # Home page (Health Systems Directory)
│   └── api/health-systems/route.ts # Example API route
├── src/
│   ├── db/
│   │   ├── entities/               # User & HealthSystem examples
│   │   ├── migrations/             # Initial migration applied
│   │   ├── config.ts               # MikroORM config
│   │   ├── orm.ts                  # Helper functions
│   │   └── seed.ts                 # Seeding script
│   └── lib/
│       └── openai.ts               # OpenAI client setup
├── components/ui/                   # shadcn/ui components
├── docker-compose.yml              # PostgreSQL container
├── README.md                       # Candidate instructions
├── INTERVIEWER_GUIDE.md            # Internal interview guide
├── SETUP_CHECKLIST.md              # Interview prep checklist
└── .env.example                    # Environment template
```

---

## Quick Start Commands

```bash
# Setup
docker compose up -d
npm install
npm run db:migrate:up
npm run db:seed

# Development
npm run dev

# Verification
npm run build

# Database Management
npm run db:migrate:create    # Create new migration
npm run db:migrate:up        # Apply migrations
npm run db:seed              # Reset seed data
```

---

## Design Decisions

### Why These Technologies?

- **MikroORM:** Matches your actual stack, tests their ability to work with a less common ORM
- **OpenAI:** Realistic AI integration, tests async handling and API costs awareness
- **shadcn/ui:** Modern, shows component usage patterns without styling distractions
- **PostgreSQL:** Industry standard, good for testing relational modeling

### Why This Interview Structure?

- **Progressive complexity:** Allows seeing where candidates struggle
- **Ambiguous questions:** Tests real-world product thinking, not just coding
- **45 minutes:** Long enough to see depth, short enough to fit in schedules
- **Pre-built examples:** Candidates spend time on hard problems, not boilerplate

### What Makes This Different?

Most coding interviews test:
- Pure algorithm skills
- Speed of implementation
- Perfect code

This interview tests:
- **Product thinking** - What should we build?
- **Trade-off analysis** - What are the pros/cons?
- **Practical judgment** - What's good enough?
- **User empathy** - How will this feel to use?

---

## Evaluation Philosophy

**Green Flags:**
- Asks clarifying questions about product requirements
- Discusses multiple approaches before coding
- Tests their code (manual or automated)
- Thinks about edge cases
- Considers costs and performance

**Red Flags:**
- Rushes without understanding requirements
- No error handling
- Can't explain decisions
- Gets stuck and doesn't ask for help
- Ignores the user experience

**Remember:** A candidate who thoughtfully completes Level 1-2 with strong reasoning is better than one who rushes through all levels poorly.

---

## Next Steps

1. **Test the full flow yourself** - Go through Levels 1-3 to calibrate timing
2. **Prepare API key** - Have an OpenAI key ready to share
3. **Review evaluation rubric** - Know what you're looking for
4. **Practice the ambiguous questions** - These are the most valuable parts

---

## Notes for Interviewers

- Don't give away the answers to ambiguous questions
- Probe their thinking: "Why?" "What are the trade-offs?"
- It's okay if they don't finish - depth > breadth
- The best candidates will ask YOU questions about the product

Good luck with your interviews! This setup should help you find candidates who can both code AND think like product engineers.
