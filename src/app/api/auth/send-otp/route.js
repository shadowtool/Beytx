import { Resend } from "resend";
import { NextResponse } from "next/server";
import EmailTemplate from "@/components/Misc/EmailTemplate";
import dbConnect from "@/lib/mongodb";
import Otps from "@/models/Otps";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const otp = generateOTP();

    await dbConnect();

    await Otps.findOneAndUpdate(
      { email },
      {
        otp,
        email,
        createdAt: new Date(),
        expires: new Date(Date.now() + 10 * 60 * 1000),
      },
      { upsert: true, new: true }
    );

    const { data, error } = await resend.emails.send({
      from: "byet.co <admin@send.beyt.co>",
      to: email,
      subject: "Password Reset Verification Code",
      react: EmailTemplate({ otp }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "OTP sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
