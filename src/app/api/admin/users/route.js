import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.role !== "admin") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await dbConnect();

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

    return new Response(
      JSON.stringify({
        users,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        totalCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}
