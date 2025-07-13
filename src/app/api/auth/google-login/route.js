// POST /api/auth/google-login
// Accepts: { token: googleIdToken }
// Returns: { token }

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req) {
  await dbConnect();
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json(
      { error: "Missing Google token" },
      { status: 400 }
    );
  }
  let payload;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid Google token" },
      { status: 401 }
    );
  }
  let user = await User.findOne({ email: payload.email });
  if (!user) {
    user = await User.create({
      email: payload.email,
      name: payload.name,
      image: payload.picture,
      password: "",
    });
  }
  const jwtToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return NextResponse.json({ token: jwtToken });
}
