import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();
  const { name, email, phoneNumber, password } = await req.json();

  if (!password || (!email && !phoneNumber)) {
    return NextResponse.json(
      { message: "Email or phone and password are required" },
      { status: 400 }
    );
  }

  // Check if user exists
  const existingUser = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await User.create({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
  });

  return NextResponse.json(
    { message: "User created successfully", user: newUser },
    { status: 201 }
  );
}
