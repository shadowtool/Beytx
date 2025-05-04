import { Otps_ROLES } from "@/constants/constants";
import mongoose from "mongoose";

const OtpsSchema = new mongoose.Schema(
  {
    otp: { type: String, required: true },
    email: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Otps || mongoose.model("Otps", OtpsSchema);
