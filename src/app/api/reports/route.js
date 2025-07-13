import dbConnect from "@/lib/mongodb";
import Report from "@/models/Report";
import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
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

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    await dbConnect();
    const reports = await Report.find({ resolved: false })
      .skip(skip)
      .limit(limit);
    const totalReports = await Report.countDocuments({ resolved: false });
    const totalPages = Math.ceil(totalReports / limit);

    return NextResponse.json(
      { reports, totalPages, currentPage: page },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    const newReport = await Report.create(body);
    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Report ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { resolved: true },
      { new: true }
    );

    if (!updatedReport) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(updatedReport, { status: 200 });
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}
