import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to require sign-in (JWT verification)
export const requireSignIn = async (req, res, next) => {
  try {
    // Check if Authorization header exists and is properly formatted
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).send({
        success: false,
        message: "Authorization header is missing or improperly formatted",
      });
    }

    const token = req.headers.authorization.split(" ")[1]; // Extract token
    const decode = JWT.verify(token, process.env.JWT_SECRET); // Decode the token
    req.user = decode; // Attach user info to the request
    next(); // Proceed to next middleware
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id); // Correctly access user ID
    if (user.role !== "admin") {
      // Check if the role is admin
      return res.status(401).send({
        success: false,
        message: "Unauthorized access, admin privileges required",
      });
    } else {
      next(); // Proceed if the user is an admin
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in isAdmin middleware",
      error,
    });
  }
};
