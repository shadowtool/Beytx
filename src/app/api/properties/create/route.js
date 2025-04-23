import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId in request body" },
        { status: 400 }
      );
    }

    const userExists = await User.findById(userId);

    if (!userExists) {
      return NextResponse.json(
        { error: "User not found with the provided ID" },
        { status: 404 }
      );
    }

    const newProperty = await Property.create(body);

    return NextResponse.json(
      { success: true, propertyId: newProperty._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
