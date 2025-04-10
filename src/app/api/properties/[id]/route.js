import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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

    const similarProperties = await Property.find({
      _id: { $ne: id },
      "location.city": property.location.city,
      archived: { $ne: true },
    }).limit(5);

    propertyObj.similarProperties = similarProperties;

    return NextResponse.json(propertyObj, { status: 200 });
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const updates = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const isOwner = property.userId?.toString() === session.user._id;
    const isAdmin = session.user.role === "admin";

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { error: "You are not authorized to update this property" },
        { status: 403 }
      );
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
