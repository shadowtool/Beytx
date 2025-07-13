import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import User from "@/models/User";
import jwt from "jsonwebtoken";

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

    const authHeader = req.headers.get("Authorization");

    let userId = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      userId = payload.id;
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const user = await User.findById(userId);

    if (!user) {
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

    const isOwner = property.userId?.toString() === user.id;
    const isAdmin = user.role === "admin";

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { error: "You are not authorized to update this property" },
        { status: 403 }
      );
    }

    console.log(id, updates);

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
