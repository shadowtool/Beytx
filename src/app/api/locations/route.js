import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const locations = await Property.aggregate([
      {
        $group: {
          _id: {
            city: "$location.city",
            country: "$location.country",
          },
        },
      },
      {
        $project: {
          _id: 0,
          city: "$_id.city",
          country: "$_id.country",
        },
      },
    ]);

    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
