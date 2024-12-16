// Import Mongoose for database interaction
import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
      trim: true, // Trims any extra spaces
    },
    email: {
      type: String,
      required: true, // Email is mandatory
      unique: true, // Email must be unique
    },
    password: {
      type: String,
      required: true, // Password is mandatory
    },
    phone: {
      type: Number,
      default: "", // Phone number is mandatory
    },
    role: {
      type: String,
      default: "user", // Default role is 0 (e.g., user), can be updated for admins
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the User model
export default mongoose.model("users", userSchema);
