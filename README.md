# Elion AI Research Assistant

An AI-powered research assistant platform that helps health IT leaders discover and analyze research papers about the health tech landscape.

## Tech Stack

- **Frontend**: Next.js 16 with App Router, React 19, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Database**: PostgreSQL with MikroORM
- **AI**: OpenAI API
- **Code Quality**: Biome for linting and formatting

## Prerequisites

- Node.js 20+ installed
- Docker and Docker Compose installed
- OpenAI API key

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Add your OpenAI API key to `.env.local`:

```
OPENAI_API_KEY=your_api_key_here
```

### 3. Start the Database

```bash
docker compose up -d
```

Verify it's running:

```bash
docker compose ps
```

### 4. Run Migrations

```bash
npm run db:migrate:up
```

### 5. Seed the Database

```bash
npm run db:seed
```

This will populate the database with sample users and health systems.

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
.
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   │   └── health-systems/   # Example API endpoint
│   └── page.tsx              # Home page
├── components/               # React components
│   └── ui/                   # shadcn/ui components
├── db/
│   ├── entities/             # MikroORM entity definitions
│   │   ├── User.ts           # Example: User entity
│   │   ├── HealthSystem.ts   # Example: HealthSystem entity
│   │   └── Vendor.ts         # Example: Vendor entity
│   ├── migrations/           # Database migrations
│   ├── config.ts             # MikroORM configuration
│   ├── orm.ts                # ORM helper functions
│   └── seed.ts               # Database seeding script
├── lib/
│   └── openai.ts             # OpenAI client setup
├── docker-compose.yml        # PostgreSQL container config
└── README.md                 # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run db:migrate:create` - Create a new migration
- `npm run db:migrate:up` - Run pending migrations
- `npm run db:migrate:down` - Rollback last migration
- `npm run db:seed` - Seed database with sample data

## Database Access

You can access the PostgreSQL database directly:

```bash
docker exec -it elion-interview-db psql -U elion -d elion_interview
```

Useful psql commands:
- `\dt` - List all tables
- `\d table_name` - Describe table structure
- `SELECT * FROM user;` - Query data

## Application Structure

The home page displays a Health Systems Directory showing example data. You can reference the implementation:
- API Route: `app/api/health-systems/route.ts`
- Entity: `db/entities/HealthSystem.ts`
- Page: `app/page.tsx`

This demonstrates:
- Creating an API route with MikroORM
- Fetching data on the client side
- Displaying data with shadcn/ui components

## Working with MikroORM

### Creating a New Entity

1. Create entity file in `db/entities/`:

```typescript
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class MyEntity {
  @PrimaryKey({ type: 'number' })
  id!: number;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'Date' })
  createdAt: Date = new Date();
}
```

2. Add to `db/config.ts` entities array

3. Create and run migration:

```bash
npm run db:migrate:create
npm run db:migrate:up
```

### Using the ORM in API Routes

```typescript
import { withORM } from '@/db/orm';
import { MyEntity } from '@/db/entities/MyEntity';

export async function GET() {
  const results = await withORM(async (em) => {
    return em.find(MyEntity, {});
  });
  return NextResponse.json({ data: results });
}
```

## Working with OpenAI

The OpenAI client is pre-configured. Import and use it:

```typescript
import { getOpenAIClient } from '@/lib/openai';

const openai = getOpenAIClient();
const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "user", content: "Your prompt here" }
  ],
});
```

## Tips

- **Database changes**: Always create migrations for schema changes
- **Type safety**: Use TypeScript types from your entities
- **Error handling**: Wrap database calls in try-catch blocks
- **API routes**: Use `NextResponse.json()` for responses
- **Client components**: Add `'use client'` directive when using React hooks
- **shadcn/ui**: Components are in `components/ui/`, import and use directly

## Troubleshooting

### Database connection issues

```bash
docker compose down
docker compose up -d
# Wait a few seconds for startup
npm run db:migrate:up
```

### Port 5432 already in use

Stop local PostgreSQL or change the port in `docker-compose.yml`

### TypeScript errors

```bash
npm run build
```

This will show all type errors at once.

## Need Help?

- Review existing entity definitions in `db/entities/`
- Inspect the API route implementation in `app/api/health-systems/route.ts`
- Check the home page component in `app/page.tsx`
