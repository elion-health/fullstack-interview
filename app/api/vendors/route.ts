import { NextResponse } from "next/server";
import { withORM } from "@/db/orm";
import { Vendor } from "@/db/entities/Vendor";

// GET /api/vendors - Fetch all vendors
export async function GET() {
  try {
    const vendors = await withORM(async (em) => {
      return em.find(Vendor, {});
    });

    return NextResponse.json({ data: vendors });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json(
      { error: "Failed to fetch vendors" },
      { status: 500 },
    );
  }
}
