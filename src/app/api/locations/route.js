import { LOCATIONS_DATA } from "@/lib/locationsData";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const locations = await Promise.all(
      LOCATIONS_DATA.map(async (location) => {
        const propertyCount = await Property.countDocuments({
          "location.city": location.city,
        });
        return { ...location, propertyCount };
      })
    );

    const sortedLocations = locations.sort(
      (a, b) => b.propertyCount - a.propertyCount
    );

    return NextResponse.json(sortedLocations);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
