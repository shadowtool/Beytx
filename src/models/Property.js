import { PROPERTY_STATUS } from "@/constants/propertyStatus";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String },
    titleArabic: { type: String },
    status: { type: String, enum: PROPERTY_STATUS },
    price: { type: Number },
    location: {
      lat: { type: String },
      lng: { type: String },
      address: { type: String },
      city: { type: String },
      pincode: { type: String },
      country: { type: String },
    },
    size: { type: Number },
    type: {
      type: String,
      enum: PROPERTY_TYPES,
    },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
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
  },
  { timestamps: true }
);

const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
export default Property;
