import mongoose from "mongoose";

const rentProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
      min: [1, "Price must be at least 1"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "users", // Referencing the User model
      required: true, // Ensure every product has an associated seller
    },
  },
  { timestamps: true }
);

export default mongoose.model("RentProduct", rentProductSchema);
