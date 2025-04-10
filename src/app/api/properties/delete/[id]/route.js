import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Property deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
