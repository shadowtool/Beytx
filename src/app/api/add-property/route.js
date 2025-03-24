import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const newProperty = await Property.create(body);

    return NextResponse.json(
      { success: true, propertyId: newProperty._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
