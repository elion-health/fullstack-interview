import { NextResponse } from "next/server";
import { HealthSystem } from "@/db/entities/HealthSystem";
import { withORM } from "@/db/orm";

// GET /api/health-systems - Fetch all health systems
export async function GET() {
  try {
    const healthSystems = await withORM(async (em) => {
      return em.find(HealthSystem, {});
    });

    return NextResponse.json({ data: healthSystems });
  } catch (error) {
    console.error("Error fetching health systems:", error);
    return NextResponse.json(
      { error: "Failed to fetch health systems" },
      { status: 500 },
    );
  }
}
