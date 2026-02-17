# Elion Healthcare Vendor Intelligence Platform

A platform for healthcare IT leaders to track and analyze vendor relationships, products, and unstructured research data about the health tech landscape.

## Tech Stack

- **Frontend**: Next.js 16 with App Router, React 19, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Database**: PostgreSQL
- **Backend (TypeScript)**: Next.js API Routes with MikroORM
- **Backend (Python)**: FastAPI with async SQLAlchemy + Alembic
- **AI**: OpenAI API
- **Code Quality**: Biome for linting and formatting

## Choose Your Language

This project supports **two independent backend options**. Pick whichever you're most comfortable with — the React frontend works identically with either one.

| | TypeScript (default) | Python |
|---|---|---|
| **Framework** | Next.js API Routes | FastAPI |
| **ORM** | MikroORM | SQLAlchemy (async) |
| **Migrations** | MikroORM Migrations | Alembic |
| **Package Manager** | npm | uv |
| **Run command** | `npm run dev` | `cd api-python && make dev` |

> **Important:** Pick one language and use its tooling end-to-end. Don't mix migration systems — use either MikroORM migrations or Alembic, not both.

## Prerequisites

- [Docker Desktop](https://docs.docker.com/get-docker/) installed (includes Docker Compose)

**For TypeScript:**
- [Node.js 20+](https://nodejs.org/en/download/)

**For Python:**
- [Python 3.12+](https://www.python.org/downloads/)
- [uv](https://docs.astral.sh/uv/getting-started/installation/) package manager

## Getting Started

### 1. Start PostgreSQL with Docker

```bash
docker compose up -d
```

This will start a PostgreSQL 18 container with the following configuration:
- **Host**: localhost
- **Port**: 5432
- **Database**: elion_interview
- **User**: elion
- **Password**: elion_dev_password

Verify the database is running:

```bash
docker compose ps
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then add your OpenAI API key to `.env.local`:

```bash
DATABASE_URL=postgresql://elion:elion_dev_password@localhost:5432/elion_interview
OPENAI_API_KEY=<provided_openai_key>
```

---

## TypeScript Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Database Migrations and Seed Data

Run migrations to create the database schema:

```bash
npm run db:migrate:up
```

Seed the database with sample data:

```bash
npm run db:seed
```

This will populate your database with:
- 4 sample users (health system executives)
- 8 healthcare vendors (Epic, Cerner, Health Catalyst, etc.)
- 24 products across all vendors
- 5 health systems

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## Python Setup

### 1. Install Dependencies

```bash
cd api-python
uv sync
```

### 2. Run Database Migrations

```bash
uv run alembic upgrade head
```

### 3. Seed the Database

```bash
uv run python seed.py
```

### 4. Start the FastAPI Server

```bash
uv run uvicorn app.main:app --reload --port 8000
```

Or using the Makefile:

```bash
make dev
```

### 5. Connect the Frontend

In another terminal, add `API_MODE=python` to your `.env.local`:

```bash
echo 'API_MODE=python' >> .env.local
```

Then start the Next.js frontend:

```bash
npm install  # if you haven't already
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the frontend will proxy API calls to FastAPI on port 8000.

---

## Project Structure

```
.
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes (TypeScript backend)
│   │   └── health-systems/   # Example API endpoint
│   └── page.tsx              # Home page
├── api-python/               # Python backend (FastAPI)
│   ├── app/
│   │   ├── main.py           # FastAPI app entry point
│   │   ├── config.py         # Settings (reads ../.env.local)
│   │   ├── database.py       # Async engine & session
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic response schemas
│   │   └── routers/          # API route handlers
│   ├── alembic/              # Database migrations
│   ├── seed.py               # Database seeding script
│   └── Makefile              # Convenience commands
├── components/               # React components
│   └── ui/                   # shadcn/ui components
├── db/
│   ├── entities/             # MikroORM entity definitions
│   │   ├── User.ts           # Health system users
│   │   ├── HealthSystem.ts   # Healthcare organizations
│   │   ├── Vendor.ts         # Healthcare vendors (Epic, Cerner, etc.)
│   │   └── Product.ts        # Vendor products (EpicCare, MyChart, etc.)
│   ├── migrations/           # Database migrations (TypeScript)
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

### TypeScript

- `npm run dev` - Start development server (frontend + TS API)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run db:reset` - Drop schema, run migrations, and seed database (fresh start)
- `npm run db:migrate:create` - Create a new migration
- `npm run db:migrate:up` - Run pending migrations
- `npm run db:migrate:down` - Rollback last migration
- `npm run db:seed` - Seed database with sample data

### Python (run from `api-python/`)

- `make dev` - Start FastAPI dev server on port 8000
- `make install` - Install dependencies with uv
- `make migrate` - Run pending Alembic migrations
- `make migrate-create name="description"` - Create a new migration
- `make migrate-down` - Rollback last migration
- `make seed` - Seed database with sample data
- `make reset` - Drop all tables, re-migrate, and re-seed

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

[MikroORM Docs](https://mikro-orm.io/docs/guide/first-entity)

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

## Working with SQLAlchemy

[SQLAlchemy Async Docs](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)

The Python backend has three layers you'll work with. Understanding what each does will save you a lot of confusion:

| Layer | Directory | Purpose |
|---|---|---|
| **Models** | `app/models/` | SQLAlchemy classes that map to database tables. Define columns, relationships, and foreign keys. |
| **Schemas** | `app/schemas/` | Pydantic classes that define the shape of API responses (JSON). Control what fields are returned and how they're named (e.g. `created_at` → `createdAt`). |
| **Routers** | `app/routers/` | FastAPI route handlers. Query the database using models, return data shaped by schemas. |

When adding a new feature, you typically touch all three.

### Creating a New Model

1. Create a model file in `api-python/app/models/`:

```python
from datetime import datetime
from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class MyModel(Base):
    __tablename__ = "my_model"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
```

2. Import it in `api-python/app/models/__init__.py`

3. Create and run migration:

```bash
cd api-python
make migrate-create name="add my_model table"
make migrate
```

### Adding a Relationship

Adding a relationship between models typically involves changes across multiple layers:

1. **Model** (`app/models/`) — Define the relationship using SQLAlchemy's `relationship()` and any necessary foreign keys or join tables
2. **Migration** (`alembic/`) — Create and run a migration for any new tables or columns: `make migrate-create name="description"` then `make migrate`
3. **Schema** (`app/schemas/`) — Update or create Pydantic schemas so the related data appears in API responses
4. **Router** (`app/routers/`) — Update queries to load the relationship data

> **Async gotcha:** In async SQLAlchemy, relationships are **never loaded automatically**. You must use eager loading (e.g. `selectinload`) in your queries, or you'll get an error when accessing a relationship attribute.

### Using Async Sessions in Routes

```python
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.models.my_model import MyModel

router = APIRouter()

@router.get("/api/my-models")
async def list_models(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(MyModel))
    items = result.scalars().all()
    return {"data": [item.__dict__ for item in items]}
```

## Troubleshooting

### Database connection issues

If you encounter database connection errors:

1. Verify the PostgreSQL container is running:
   ```bash
   docker compose ps
   ```

2. Check the container logs:
   ```bash
   docker compose logs postgres
   ```

3. Verify your `.env.local` file has the correct `DATABASE_URL`:
   ```bash
   DATABASE_URL=postgresql://elion:elion_dev_password@localhost:5432/elion_interview
   ```

### Reset the database

If you need to start fresh:

**TypeScript:**
```bash
npm run db:reset
```

**Python:**
```bash
cd api-python
make reset
```

### Stop the database

When you're done working:

```bash
docker compose down
```

To stop and remove all data:

```bash
docker compose down -v
```

### TypeScript errors

```bash
npm run build
```

This will show all type errors at once.

### Python: "Module not found" errors

Make sure you're running commands from the `api-python/` directory and using `uv run`:

```bash
cd api-python
uv run uvicorn app.main:app --reload --port 8000
```

### Python: asyncpg connection errors

Verify your `.env.local` is in the project root (one level above `api-python/`). The Python app reads `../.env.local` automatically.
