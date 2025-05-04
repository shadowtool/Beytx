import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import Otps from "@/models/Otps";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { email, password, otp } = await request.json();

    if (!email || !password || !otp) {
      return NextResponse.json(
        { error: "Email, password and OTP are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify OTP one last time
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

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    const result = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete the used OTP
    await Otps.deleteOne({ email });

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
