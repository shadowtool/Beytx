import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true, enum: ['sale', 'rent'] },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['Villa', 'Apartment', 'Office', 'Townhouse', 'Land'] 
  },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String },
  images: [{ type: String }],
  amenities: [{ type: String }],
  contact: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
export default Property;