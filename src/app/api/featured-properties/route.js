import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET(req) {
  try {
    await dbConnect();

    // Allowed property types
    const allowedTypes = ["Villa", "Apartment", "Office", "Townhouse", "Land"];

    // Extract search params
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    // Build query object (only fetch featured properties)
    const query = { featured: true, archived: false };

    // Validate type before applying filter
    if (type) {
      if (!allowedTypes.includes(type)) {
        return NextResponse.json(
          { error: "Invalid property type" },
          { status: 400 }
        );
      }
      query.type = type;
    }

    // Fetch filtered featured properties (max 9)
    const properties = await Property.find(query).limit(9);

    return NextResponse.json({ properties }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch featured properties", details: error.message },
      { status: 500 }
    );
  }
}
