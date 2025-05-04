import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Otps from "@/models/Otps";

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const storedOTP = await Otps.findOne({
      email,
      otp,
      expires: { $gt: new Date() },
    });

    if (!storedOTP) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    return NextResponse.json({ verified: true }, { status: 200 });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
