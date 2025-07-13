import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  const authHeader = req.headers.get("Authorization");

  let userId = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    userId = authHeader.split(" ")[1];
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const user = await User.findById(userId);

  if (!user || user?.role !== "admin") {
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
