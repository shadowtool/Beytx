import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
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

    const session = await getServerSession(authOptions);

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (session?.user?.role !== "admin" && id !== session?.user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 400 });
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check for email uniqueness before updating
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
      user.email = email;
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

    if (isVerified && session?.user?.role === "admin") {
      user.isVerified = isVerified;
    }

    if (role && session?.user?.role === "admin") {
      user.role = role;
    }

    await user.save();
    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
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
