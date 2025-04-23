import { LOCATIONS_DATA } from "@/lib/locationsData";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const locations = LOCATIONS_DATA;

    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
