import { NextResponse } from "next/server";
import { withORM } from "@/db/orm";
import { HealthSystem } from "@/db/entities/HealthSystem";

// GET /api/health-systems/:id - Fetch a single health system with vendors
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params;
    const healthSystem = await withORM(async (em) => {
      const id = parseInt(idParam, 10);

      if (isNaN(id)) {
        return null;
      }

      // Fetch health system and populate vendors relationship
      return em.findOne(HealthSystem, { id }, { populate: ["vendors"] });
    });

    if (!healthSystem) {
      return NextResponse.json(
        { error: "Health system not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: healthSystem });
  } catch (error) {
    console.error("Error fetching health system:", error);
    return NextResponse.json(
      { error: "Failed to fetch health system" },
      { status: 500 },
    );
  }
}
