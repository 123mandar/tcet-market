// Import Mongoose for database interaction
import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the user schema
const contactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true, // Name is mandatory
      trim: true, // Trims any extra spaces
    },
    email: {
      type: String,
      required: true, // Email is mandatory
      unique: true, // Email must be unique
    },

    phone: {
      type: String,
      required: true, // Phone number is mandatory
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the User model
export default mongoose.model("contacts", contactSchema);
