import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    const userId = session?.user?.id || null;

    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const name = searchParams.get("name");
    const type = JSON.parse(searchParams.get("type"));
    const status = searchParams.get("status");
    const locationParam = searchParams.get("location");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sortBy");
    const userIdParam = searchParams.get("userId");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 9;

    const skip = (page - 1) * limit;

    const query = {};

    if (featured === "true" || featured === "false") {
      query.featured = featured === "true";
    }

    query.archived = false;

    if (name) {
      query.title = { $regex: new RegExp(name, "i") };
    }

    if (type) {
      query.type = type;
    }

    // Filter by Status
    if (status) {
      query.status = status;
    }

    // Filter by User ID
    if (userIdParam) {
      query.userId = userIdParam;
    }

    let locationsArray = [];
    try {
      locationsArray = JSON.parse(locationParam);
    } catch (error) {
      console.error("Invalid location format:", error);
    }

    if (Array.isArray(locationsArray) && locationsArray.length > 0) {
      query["location.city"] = {
        $in: locationsArray.map((loc) => new RegExp(loc, "i")),
      };
    }

    if (bedrooms) {
      query.bedrooms = { $gte: parseInt(bedrooms) };
    }

    if (bathrooms) {
      query.bathrooms = { $gte: parseInt(bathrooms) };
    }

    // Filter by Price Range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Sorting logic
    const sortOptions = {};
    if (sort) {
      switch (sort) {
        case "price_asc":
          sortOptions.price = 1;
          break;
        case "price_desc":
          sortOptions.price = -1;
          break;
        case "listing_date":
          sortOptions.createdAt = -1;
          break;
        case "beds_asc":
          sortOptions.bedrooms = 1;
          break;
        case "beds_desc":
          sortOptions.bedrooms = -1;
          break;
        case "baths_asc":
          sortOptions.bathrooms = 1;
          break;
        case "baths_desc":
          sortOptions.bathrooms = -1;
          break;
        default:
          break;
      }
    }

    const properties = await Property.find(query)
      .populate({ path: "userId", select: "email phoneNumber name _id image" })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalCount = await Property.countDocuments(query);

    let likedPropertyIds = new Set();
    if (userId) {
      const user = await User.findById(userId).select("favorites");
      if (user) {
        likedPropertyIds = new Set(user.favorites.map((fav) => fav.toString()));
      }
    }

    const propertiesWithLikeStatus = properties.map((property) => ({
      ...property.toObject(),
      isLiked: likedPropertyIds.has(property._id.toString()),
    }));

    return NextResponse.json(
      {
        properties: propertiesWithLikeStatus,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        totalCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch properties", details: error.message },
      { status: 500 }
    );
  }
}
