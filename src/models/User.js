import { USER_ROLES } from "@/constants/constants";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phoneNumber: { type: String, unique: true, sparse: true },
    password: { type: String },
    image: String,
    createdAt: { type: Date, default: Date.now },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
