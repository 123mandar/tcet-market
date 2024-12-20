import fs from "fs";
import slugify from "slugify";
import rentProductModel from "../models/rentProductModel.js.js";

// Create Rent Product
export const createRentProductController = async (req, res) => {
  try {
    const { name, description, pricePerDay, category } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !pricePerDay:
        return res.status(400).send({ error: "Price per day is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    const sellerId = req.user._id; // Get seller ID from logged-in user

    const rentProduct = new rentProductModel({
      ...req.fields,
      slug: slugify(name),
      sellerId,
    });

    if (photo) {
      rentProduct.photo.data = fs.readFileSync(photo.path);
      rentProduct.photo.contentType = photo.type;
    }

    await rentProduct.save();
    res.status(201).send({
      success: true,
      message: "Rent Product created successfully",
      rentProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating rent product",
      error: error.message,
    });
  }
};

// Get All Rent Products
export const getRentProductController = async (req, res) => {
  try {
    const rentProducts = await rentProductModel
      .find({})
      .populate("sellerId", "name email phone")
      .select("-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      count: rentProducts.length,
      message: "Fetched all rent products",
      rentProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching rent products",
      error: error.message,
    });
  }
};

// Get Single Rent Product
export const getSingleRentProductController = async (req, res) => {
  try {
    const rentProduct = await rentProductModel
      .findOne({
        slug: req.params.slug,
      })
      .select("-photo")
      .populate("sellerId", "name");

    res.status(200).send({
      success: true,
      message: "Fetched single rent product",
      rentProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching single rent product",
      error: error.message,
    });
  }
};

// Get Rent Product Photo
export const rentProductPhotoController = async (req, res) => {
  try {
    const rentProduct = await rentProductModel
      .findById(req.params.pid)
      .select("photo");
    if (rentProduct.photo.data) {
      res.set("Content-Type", rentProduct.photo.contentType);
      return res.status(200).send(rentProduct.photo.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching rent product photo",
      error: error.message,
    });
  }
};

// Delete Rent Product
export const deleteRentProductController = async (req, res) => {
  try {
    await rentProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Rent Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error deleting rent product",
      error: error.message,
    });
  }
};

// Backend Controller
export const getUserRentProductsController = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const rentProducts = await rentProductModel
      .find({ sellerId: sellerId })
      .populate("category");

    if (rentProducts.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No rent products found for this seller",
      });
    }

    // Convert photo to Base64
    const rentProductsWithPhoto = rentProducts.map((rentProduct) => {
      const photoData = rentProduct.photo?.data
        ? rentProduct.photo.data.toString("base64")
        : null;
      return {
        ...rentProduct.toObject(),
        photo: photoData
          ? `data:${rentProduct.photo.contentType};base64,${photoData}`
          : null,
      };
    });

    // Send response with the key 'rentProducts'
    res.status(200).send({
      success: true,
      message: "Fetched seller's rent products successfully",
      rentProducts: rentProductsWithPhoto, // Corrected key to 'rentProducts'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching rent products",
      error: error.message,
    });
  }
};
