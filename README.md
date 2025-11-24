# Elion Healthcare Vendor Intelligence Platform

A platform for healthcare IT leaders to track and analyze vendor relationships, products, and unstructured research data about the health tech landscape.

## Tech Stack

- **Frontend**: Next.js 16 with App Router, React 19, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Database**: PostgreSQL with MikroORM
- **AI**: OpenAI API
- **Code Quality**: Biome for linting and formatting

## Prerequisites

- Node.js 20+ installed
- Database credentials (provided separately)
- OpenAI API key (provided separately)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the provided environment variables:

```bash
DATABASE_URL=<provided_database_url>
OPENAI_API_KEY=<provided_openai_key>
```

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

The database is already set up with sample data:
- 4 sample users (health system executives)
- 8 healthcare vendors (Epic, Cerner, Health Catalyst, etc.)
- 24 products across all vendors
- 5 health systems

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
│   │   ├── User.ts           # Health system users
│   │   ├── HealthSystem.ts   # Healthcare organizations
│   │   ├── Vendor.ts         # Healthcare vendors (Epic, Cerner, etc.)
│   │   └── Product.ts        # Vendor products (EpicCare, MyChart, etc.)
│   ├── migrations/           # Database migrations
│   ├── config.ts             # MikroORM configuration
│   ├── orm.ts                # ORM helper functions
│   └── seed.ts               # Database seeding script
├── unstructured_data/        # Sample unstructured research data
│   ├── vendor_notes/         # Call notes, transcripts, assessments
│   └── product_notes/        # Product feedback, implementation notes
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
- `npm run db:reset` - Drop schema, run migrations, and seed database (fresh start)
- `npm run db:migrate:create` - Create a new migration
- `npm run db:migrate:up` - Run pending migrations
- `npm run db:migrate:down` - Rollback last migration
- `npm run db:seed` - Seed database with sample data

## Data Model

### Entities

- **User**: Health system executives and IT leaders
- **HealthSystem**: Healthcare organizations (hospitals, medical centers)
- **Vendor**: Healthcare technology vendors (Epic, Cerner, Health Catalyst, etc.)
- **Product**: Specific products offered by vendors (EpicCare, MyChart, etc.)

### Relationships

- Vendor → Product: One-to-Many (vendors offer multiple products)

### Unstructured Data

The `unstructured_data/` directory contains realistic sample data that simulates real-world vendor research:

**Vendor Notes** (`unstructured_data/vendor_notes/`):
- Call notes from vendor meetings
- Meeting transcripts with detailed discussions
- Security assessments and compliance reviews
- Contract renewal negotiations

**Product Notes** (`unstructured_data/product_notes/`):
- User feedback compilations
- Implementation progress notes
- Product upgrade planning documents

## Application Structure

The home page displays:
- **Healthcare Vendors**: Click any vendor to see their products
- **Health Systems Directory**: Click to see details

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
## Troubleshooting

### Database connection issues

If you encounter database connection errors, verify your `.env.local` file has the correct `DATABASE_URL`.

### Reset the database

If you need to start fresh:

```bash
npm run db:reset
```

### TypeScript errors

```bash
npm run build
```

This will show all type errors at once.
