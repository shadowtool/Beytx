import { COMPLETE_LOCATION_DATA } from "@/lib/locationsData";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  try {
    // Get country from query params
    const { searchParams } = new URL(req.url);

    const country = searchParams.get("country");

    const filteredLocations = country
      ? COMPLETE_LOCATION_DATA.filter(
          (location) =>
            location.country.toLowerCase() === country?.toLowerCase()
        )
      : COMPLETE_LOCATION_DATA;

    const locations = await Promise.all(
      filteredLocations.map(async (location) => {
        const propertyCount = await Property.countDocuments({
          "location.city": location.city,
          ...(country ? { "location.country": country } : {}),
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
