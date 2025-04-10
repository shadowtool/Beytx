import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    await dbConnect();

    const body = await req.json();

    // if (!session || body?.userId !== session?.user?._id) {
    //   return NextResponse.json(
    //     { error: "Unauthorized access" },
    //     { status: 401 }
    //   );
    // }

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
