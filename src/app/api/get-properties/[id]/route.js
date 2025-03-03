import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    // Fetch the property and populate complete user data
    const property = await Property.findById(id).populate("userId");

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (property?.archived) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const propertyObj = property.toObject();

    propertyObj.user = propertyObj.userId;
    delete propertyObj.userId;

    return NextResponse.json(propertyObj, { status: 200 });
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const updates = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params; // No need for 'await' here, params is already an object

    if (!id) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { archived: true },
      { new: true, runValidators: true }
    );

    console.log({ updatedProperty });

    if (!updatedProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Property archived successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error archiving property:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
