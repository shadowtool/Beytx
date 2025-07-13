// app/api/auth/google-callback-app/route.js
import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const idToken = searchParams.get("idToken");
  if (!idToken) {
    return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
  }

  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: [
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_ID_ANDROID,
        process.env.GOOGLE_CLIENT_ID_IOS,
      ].filter(Boolean),
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new Error("Invalid token payload");
    }

    // 4) Find or create the user
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = await User.create({
        email: payload.email,
        name: payload.name,
        image: payload.picture,
        password: "", // no password for OAuth users
      });
    }

    // 5) Issue your own JWT
    const appToken = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6) Return JSON (no redirect)
    return NextResponse.json(
      {
        token: appToken,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("google-callback-app error", err);
    return NextResponse.json(
      { error: "Authentication failed", details: err.message },
      { status: 500 }
    );
  }
}
