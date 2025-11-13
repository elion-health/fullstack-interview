# Interview Setup Checklist

Use this checklist to prepare for an interview session.

## Before the Interview

- [ ] Pull latest changes from repository
- [ ] Ensure Docker is running
- [ ] Start database: `docker compose up -d`
- [ ] Install dependencies: `npm install`
- [ ] Run migrations: `npm run db:migrate:up`
- [ ] Seed database: `npm run db:seed`
- [ ] Verify build works: `npm run build`
- [ ] Prepare OpenAI API key to share with candidate

## At Interview Start

- [ ] Share OpenAI API key with candidate
- [ ] Have them add key to `.env.local`
- [ ] Walk through basic setup (5 min max)
- [ ] Show them the example at `/examples`
- [ ] Verify their dev server works: `npm run dev`
- [ ] Share the task from `INTERVIEWER_GUIDE.md`

## During Interview

- [ ] Take notes on problem-solving approach
- [ ] Note questions they ask
- [ ] Observe how they handle ambiguity
- [ ] Track which level they reach
- [ ] Note any impressive insights or red flags

## After Interview

- [ ] Reset database: `npm run db:seed` (for next candidate)
- [ ] Review code they wrote (if applicable)
- [ ] Fill out evaluation rubric from interviewer guide
- [ ] Prepare feedback notes

## Troubleshooting

**Database connection errors:**
```bash
docker compose down
docker compose up -d
sleep 5
npm run db:migrate:up
npm run db:seed
```

**Port conflicts:**
- Database: Change port in `docker-compose.yml`
- App: Use `npm run dev -- -p 3001`

**Build errors:**
- Run `npm run build` to see all TypeScript errors
- Check that migrations are up to date
