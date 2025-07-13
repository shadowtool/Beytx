// POST /api/auth/login
// Accepts: { email or phone, password }
// Returns: { token }

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();
  const { email, phone, password } = await req.json();
  if (!((email || phone) && password)) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }
  const user = await User.findOne({ $or: [{ email }, { phone }] });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return NextResponse.json({ token });
}
