import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const propertyTypes = await Promise.all(
      PROPERTY_TYPES.map(async (type) => {
        const propertyCount = await Property.countDocuments({
          type: type,
        });
        return { type, propertyCount };
      })
    );

    const sortedLocations = propertyTypes.sort(
      (a, b) => b.propertyCount - a.propertyCount
    );

    return NextResponse.json(sortedLocations?.map((el) => el.type));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
