import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
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

    if (!user || user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional: newest first

    const totalCount = await User.countDocuments();

    return NextResponse.json({
      users,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      totalCount,
    });
  } catch (error) {
    console.error("Admin users API error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
