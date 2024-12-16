// Import necessary modules
import userModel from "../models/userModel.js"; // Import user model for database operations
import { comparePassword, hashPassword } from "../helpers/authHelper.js"; // Import helper functions for password operations
import JWT from "jsonwebtoken"; // Import JSON Web Token library for authentication
import { OAuth2Client } from "google-auth-library";

// ======================Register============================================
// Define the registerController function for user registration
export const registerController = async (req, res) => {
  try {
    // Destructure request body to get user details
    const { name, email, password, phone, role = "user" } = req.body;

    // Validate required fields: name, email, password, phone, and role
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone is required" });
    }
    if (!role) {
      return res.status(400).send({ message: "Role is required" });
    }

    // Check if the user already exists in the database based on email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      // Return conflict response if user already registered
      return res.status(409).send({
        success: false,
        message: "User already registered, please log in",
      });
    }

    // Hash the user's password before saving it in the database
    const hashedpassword = await hashPassword(password);

    // Create a new user instance with the hashed password and save to database
    const user = await new userModel({
      name,
      email,
      password: hashedpassword,
      phone,
      role,
    }).save();

    // Respond with success message and newly created user
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    // Handle any errors that occur during registration
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// ======================LOGIN=============================
// Define the loginController function for user login
export const loginController = async (req, res) => {
  try {
    // Destructure the request body to extract login credentials
    const { email, password } = req.body;

    // Validate email and password are provided
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if the user exists in the database based on the email
    const user = await userModel.findOne({ email });
    if (!user) {
      // Respond with an error if email is not registered
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare the provided password with the hashed password in the database
    const match = await comparePassword(password, user.password);
    if (!match) {
      // Respond with an error if the passwords don't match
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate a JWT token valid for 7 days
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // You can change this duration as per your requirements
    });

    // Send success response with the user details and token
    res.status(200).send({
      success: true,
      message: "Login Successful!",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token, // Send the generated token back to the client
    });
  } catch (error) {
    // Handle any errors that occur during login
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login process",
      error: error.message || error,
    });
  }
};

export const testController = (req, res) => {
  res.send("Protected Route");
};

// ------------------------------------------------------------------------------/
// =============================GoogleLogin==============================//

const client = new OAuth2Client(process.env.REACT_APP_CLIENT_ID);
export const googleLoginController = async (req, res) => {
  const { token } = req.body;
  try {
    console.log("Received token:", token);
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.REACT_APP_CLIENT_ID,
    });
    // Log after verifying the token
    console.log("Token verified successfully");
    const payload = ticket.getPayload();
    const { email, name } = payload; // Retrieve email and name from payload
    // Log the email and name received from Google
    console.log("Google payload:", payload);

    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (!user) {
      console.log("New user, creating in database");
      user = new userModel({
        name,
        email,
        password: "google-auth", // Placeholder password
        phone: "", // You might want to change this later based on your application needs
        role: "user",
      });
      await user.save(); // Save the new user to the database
    }

    // Generate JWT token
    const jwtToken = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Log successful login
    console.log("Login successfull, sending response");

    // Respond with success message and user data
    res.status(200).json({
      success: true,
      message: "Login successfull!",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      success: false,
      message: "Google login failed!",
      error: error.message,
    });
  }
};
