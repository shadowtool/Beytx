// pages/api/auth/google-callback.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import axios from "axios";

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    // Exchange code for tokens
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { id_token } = tokenRes.data;

    // Verify id_token by decoding or use google-auth-library
    // Here just decode the JWT payload without verification (for example purposes)
    const base64Payload = id_token.split(".")[1];
    const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString());

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

    // Redirect to your frontend app with the token in query or cookie
    // WARNING: Passing JWT in query params has security risks, consider httpOnly cookies
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_DOMAIN}/?token=${jwtToken}`
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
