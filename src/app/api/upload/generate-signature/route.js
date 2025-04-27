// app/api/generate-signature/route.js
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const { folder, public_id } = body;

    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign = { timestamp };

    if (folder) paramsToSign.folder = folder;

    if (public_id) paramsToSign.public_id = public_id;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      public_id,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    console.error("Error generating signature:", error);
    return NextResponse.json(
      { error: "Error generating signature" },
      { status: 500 }
    );
  }
}
