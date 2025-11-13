import { NextResponse } from "next/server";
import { withORM } from "@/db/orm";
import { HealthSystem } from "@/db/entities/HealthSystem";

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
