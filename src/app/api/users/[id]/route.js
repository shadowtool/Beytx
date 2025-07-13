import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Property from "@/models/Property";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(id).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const properties = await Property.find({ userId: id })
      .sort({ createdAt: -1 })
      .populate("userId")
      .lean();

    const userWithProperties = {
      ...user,
      properties,
    };

    return NextResponse.json(userWithProperties, { status: 200 });
  } catch (error) {
    console.error("Error fetching user and properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// PUT: Update user email and phone number
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    const { email, phoneNumber, image, name, isVerified, role } =
      await req.json();

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

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (user?.role !== "admin" && id !== user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 400 });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: "Email already in use, please provide anathor email" },
          { status: 400 }
        );
      }
      user.email = email;
    }

    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
        return NextResponse.json(
          {
            error:
              "Phone number is already in use. Please provide anathor number",
          },
          { status: 400 }
        );
      }
      user.phoneNumber = phoneNumber;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (image) {
      user.image = image;
    }

    if (name) {
      user.name = name;
    }

    if (isVerified && user?.role === "admin") {
      user.isVerified = isVerified;
    }

    if (role && user?.role === "admin") {
      user.role = role;
    }

    await user.save();
    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const authHeader = req.headers.get("Authorization");

    let loggedUserId = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      loggedUserId = payload.id;
    }

    if (!loggedUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const user = await User.findById(loggedUserId);

    if (!user || user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const userId = params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
