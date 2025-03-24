import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phoneNumber: { type: String, unique: true },
  password: { type: String },
  image: String,
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }]

});

export default mongoose.models.User || mongoose.model("User", UserSchema);
