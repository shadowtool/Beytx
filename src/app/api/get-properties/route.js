import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Property from "@/models/Property";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";

export async function GET(req) {
  try {
    await dbConnect();

    // Allowed property types
    const allowedTypes = PROPERTY_TYPES;

    // Extract search params
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const location = searchParams.get("location");
    const bedrooms = searchParams.get("beds");
    const bathrooms = searchParams.get("bathrooms");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort"); // Sorting option
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 9;
    const skip = (page - 1) * limit;
    const userId = searchParams.get("userId");

    // Build query object
    const query = { archived: false };

    // Search by Name (case-insensitive)
    if (name) {
      query.title = { $regex: new RegExp(name, "i") };
    }

    // Filter by Type
    if (type) {
      if (!allowedTypes.includes(type)) {
        return NextResponse.json(
          { error: "Invalid property type" },
          { status: 400 }
        );
      }
      query.type = type;
    }

    // Filter by Status
    if (status) {
      query.status = status;
    }

    // Filter by Location
    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }

    // Filter by Beds (greater than or equal to)
    if (bedrooms) {
      query.bedrooms = { $gte: parseInt(bedrooms) };
    }

    // Filter by Bathrooms (greater than or equal to)
    if (bathrooms) {
      query.bathrooms = { $gte: parseInt(bathrooms) };
    }

    // Filter by Price Range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Filter by User ID
    if (userId) {
      query.userId = userId;
    }

    // Sorting logic
    const sortOptions = {};
    if (sort) {
      switch (sort) {
        case "featured":
          sortOptions.featured = -1;
          break;
        case "newest":
          sortOptions.createdAt = -1;
          break;
        case "price_low":
          sortOptions.price = 1;
          break;
        case "price_high":
          sortOptions.price = -1;
          break;
        case "beds_low":
          sortOptions.beds = 1;
          break;
        case "beds_high":
          sortOptions.beds = -1;
          break;
        default:
          break;
      }
    }

    // Fetch properties with filters, sorting, and pagination
    const properties = await Property.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalCount = await Property.countDocuments(query);

    return NextResponse.json(
      {
        properties,
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
