import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
    price: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    shipping: {
      type: Boolean,
      required: true,
    },

    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "users", // Referencing the User model
      required: true, // Ensure every product has an associated seller
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
