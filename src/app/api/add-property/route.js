import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property"; // Import the Mongoose model

export async function POST(req) {
  try {
    await dbConnect(); // Connect to MongoDB

    const body = await req.json(); // Parse incoming JSON data

    const newProperty = await Property.create(body); // Insert into MongoDB

    return NextResponse.json(
      { success: true, propertyId: newProperty._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
