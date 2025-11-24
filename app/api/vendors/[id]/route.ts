import { NextResponse } from "next/server";
import { withORM } from "@/db/orm";
import { Vendor } from "@/db/entities/Vendor";

// GET /api/vendors/:id - Fetch a single vendor with products
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params;
    const vendor = await withORM(async (em) => {
      const id = parseInt(idParam, 10);

      if (isNaN(id)) {
        return null;
      }

      // Fetch vendor and populate products relationship
      return em.findOne(Vendor, { id }, { populate: ["products"] });
    });

    if (!vendor) {
      return NextResponse.json(
        { error: "Vendor not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: vendor });
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return NextResponse.json(
      { error: "Failed to fetch vendor" },
      { status: 500 },
    );
  }
}
