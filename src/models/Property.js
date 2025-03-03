import { PROPERTY_STATUS } from "@/constants/propertyStatus";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true, enum: PROPERTY_STATUS },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: PROPERTY_TYPES,
  },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String },
  images: [{ type: String }],
  amenities: [{ type: String }],
  featured: { type: Boolean },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  archived: { type: Boolean, default: false },
});

const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
export default Property;
